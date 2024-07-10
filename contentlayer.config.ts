import path from "path";
import { getHighlighter, loadTheme } from "@shikijs/compat";
import {
	type ComputedFields,
	defineDocumentType,
	defineNestedType,
	makeSource,
} from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import theme from "tailwindcss/defaultTheme";
import { visit } from "unist-util-visit";
import { rehypeComponent } from "./src/lib/rehype-component";
import { rehypeNpmCommand } from "./src/lib/rehype-npm-command";

const computedFields: ComputedFields = {
	slug: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slugAsParams: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

const LinksProperties = defineNestedType(() => ({
	name: "LinksProperties",
	fields: {
		doc: {
			type: "string",
		},
		api: {
			type: "string",
		},
	},
}));

export const Doc = defineDocumentType(() => ({
	name: "Doc",
	filePathPattern: `docs/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
			required: true,
		},
		published: {
			type: "boolean",
			default: true,
		},
		links: {
			type: "nested",
			of: LinksProperties,
		},
		featured: {
			type: "boolean",
			default: false,
			required: false,
		},
		component: {
			type: "boolean",
			default: false,
			required: false,
		},
		toc: {
			type: "boolean",
			default: true,
			required: false,
		},
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./src/content",
	documentTypes: [Doc],
	mdx: {
		remarkPlugins: [codeImport],
		rehypePlugins: [
			rehypeSlug,
			rehypeComponent,
			() => (tree) => {
				visit(tree, (node) => {
					if (node?.type === "element" && node?.tagName === "pre") {
						const [codeEl] = node.children;
						if (codeEl.tagName !== "code") {
							return;
						}

						if (codeEl.data?.meta) {
							// Extract event from meta and pass it down the tree.
							const regex = /event="([^"]*)"/;
							const match = codeEl.data?.meta.match(regex);
							if (match) {
								codeEl.data.meta = codeEl.data.meta.replace(
									regex,
									"",
								);
							}
						}

						node.__rawString__ = codeEl.children?.[0].value;
						node.__src__ = node.properties?.__src__;
					}
				});
			},
			[
				rehypePrettyCode,
				{
					theme: {
						dark: async () => {
							const theme = await loadTheme(
								path.join(
									process.cwd(),
									"src/lib/themes/dark.json",
								),
							);
							return theme;
						},
						light: async () => {
							const theme = await loadTheme(
								path.join(
									process.cwd(),
									"src/lib/themes/dark.json",
								),
							);
							return theme;
						},
					},
					getHighlighter: async () => {
						const theme = await loadTheme(
							path.join(
								process.cwd(),
								"src/lib/themes/dark.json",
							),
						);
						return await getHighlighter({ theme });
					},
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						if (!node.properties.className) {
							node.properties.className = [];
						}
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			() => (tree) => {
				visit(tree, (node) => {
					if (
						node?.type === "element" &&
						node?.tagName === "figure"
					) {
						if (
							!(
								"data-rehype-pretty-code-figure" in
								node.properties
							)
						) {
							return;
						}

						const preElement = node.children.at(-1);

						if (preElement.tagName !== "pre") {
							return;
						}

						preElement.properties["__withMeta__"] =
							node.children.at(0).tagName === "div";
						preElement.properties["__rawString__"] =
							node.__rawString__;

						if (node.__src__) {
							preElement.properties["__src__"] = node.__src__;
						}
					}
				});
			},
			rehypeNpmCommand,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
