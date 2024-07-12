import { type UnistNode, type UnistTree } from "@/types/unist";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { type Data } from "unist";
import { visit } from "unist-util-visit";
import { defineConfig, s } from "velite";
import { rehypeComponent } from "./src/lib/rehype-component";
import { rehypeNpmCommand } from "./src/lib/rehype-npm-command";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
	root: "./src/content",
	collections: {
		docs: {
			name: "Doc", // collection type name
			pattern: "docs/**/*.mdx", // content files glob pattern
			schema: s
				.object({
					title: s.string(), // Zod primitive type
					description: s.string(), // Zod primitive type
					published: s.boolean().default(true), // Zod primitive type
					links: s
						.object({
							doc: s.string().url().optional(),
							api: s.string().url().optional(),
						})
						.optional(), // Zod primitive type
					featured: s.boolean().default(false).optional(), // Zod primitive type
					component: s.boolean().default(false).optional(), // Zod primitive type
					slug: s.path(), // auto generate slug from file path
					metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
					toc: s.toc(),
					excerpt: s.excerpt(), // excerpt of markdown content
					content: s.mdx(), // transform markdown to html
				})
				// more additional fields (computed fields)
				.transform((data) => ({
					...data,
					slugAsParams: data.slug.split("/").slice(1).join("/"),
				})),
		},
	},
	mdx: {
		remarkPlugins: [remarkGfm, codeImport],
		rehypePlugins: [
			rehypeSlug,
			rehypeComponent,
			() => (tree: UnistTree) => {
				visit(tree, (node: UnistNode) => {
					if (node?.type === "element" && node?.tagName === "pre") {
						const codeEl = node.children?.[0];
						if (codeEl?.tagName !== "code") {
							return;
						}

						const data = codeEl.data as
							| (Data & { meta?: string })
							| undefined;
						if (data?.meta) {
							// Extract event from meta and pass it down the tree.
							const regex = /event="([^"]*)"/;
							const match = data?.meta.match(regex);
							if (match) {
								data.meta = data.meta.replace(regex, "");
							}
						}

						if (codeEl.children?.[0]?.value) {
							(node as any).__rawString__ =
								codeEl.children[0].value;
						}
						(node as any).__src__ = node.properties?.__src__;
					}
				});
			},
			[
				rehypePrettyCode,
				{
					keepBackground: false,
					theme: {
						dark: "catppuccin-macchiato",
						light: "catppuccin-latte",
					},
					onVisitLine(node: UnistNode) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children?.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
				},
			],
			() => (tree: UnistTree) => {
				visit(tree, (node: UnistNode) => {
					if (
						node?.type === "element" &&
						node?.tagName === "figure"
					) {
						if (
							!node.properties ||
							!(
								"data-rehype-pretty-code-figure" in
								node.properties
							)
						) {
							return;
						}

						const preElement = node.children?.at(-1);

						if (preElement?.tagName !== "pre") {
							return;
						}

						if (preElement?.properties) {
							if (node.children?.at(0)?.tagName) {
								preElement.properties.__withMeta__ =
									node.children.at(0)!.tagName === "div";
							}
							preElement.properties.__rawString__ = (node as any)
								.__rawString__ as string | undefined;

							if ((node as any).__src__) {
								preElement.properties.__src__ = (
									node as any
								).__src__;
							}
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
