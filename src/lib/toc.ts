// @ts-nocheck
import { type UnistNode } from "@/types/unist";
import { toc } from "mdast-util-toc";
import { type Nodes } from "node_modules/mdast-util-toc/lib";
import { remark } from "remark";
import { visit } from "unist-util-visit";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node: UnistNode) {
	const p: string[] = [];
	visit(node, (node) => {
		if (!textTypes.includes(node.type)) return;
		if (node.value) {
			p.push(node.value);
		}
	});
	return p.join(``);
}

interface Item {
	title: string;
	url: string;
	items?: Item[];
}

interface Items {
	items?: Item[];
}

function getItems(node, current): Items {
	if (!node) {
		return {};
	}

	if (node.type === "paragraph") {
		visit(node, (item) => {
			if (item.type === "link") {
				current.url = item.url;
				current.title = flattenNode(node);
			}

			if (item.type === "text") {
				current.title = flattenNode(node);
			}
		});

		return current;
	}

	if (node.type === "list") {
		current.items = node.children.map((i) => getItems(i, {}));

		return current;
	} else if (node.type === "listItem") {
		const heading = getItems(node.children[0], {});

		if (node.children.length > 1) {
			getItems(node.children[1], heading);
		}

		return heading;
	}

	return {};
}

const getToc = () => (node: Nodes, file) => {
	const table = toc(node);
	const items = getItems(table.map, {});

	file.data = items;
};

export type TableOfContents = Items;

export async function getTableOfContents(
	content: string,
): Promise<TableOfContents> {
	const result = await remark().use(getToc).process(content);

	return result.data;
}

export interface TocEntry {
	/**
	 * Title of the entry
	 */
	title: string;
	/**
	 * URL that can be used to reach
	 * the content
	 */
	url: string;
	/**
	 * Nested items
	 */
	items: TocEntry[];
}

/**
 * Tree for table of contents
 */
export interface TocTree {
	/**
	 *  Index of the node right after the table of contents heading, `-1` if no
	 *  heading was found, `undefined` if no `heading` was given.
	 */
	index?: number;
	/**
	 *  Index of the first node after `heading` that is not part of its section,
	 *  `-1` if no heading was found, `undefined` if no `heading` was given, same
	 *  as `index` if there are no nodes between `heading` and the first heading
	 *  in the table of contents.
	 */
	endIndex?: number;
	/**
	 *  List representing the generated table of contents, `undefined` if no table
	 *  of contents could be created, either because no heading was found or
	 *  because no following headings were found.
	 */
	map?: List;
}
