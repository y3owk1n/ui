"use client";

import {
	Table,
	TableBody,
	TableBodyEmptyState,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useDragAndDrop } from "react-aria-components";

import { useAsyncList } from "react-stately";

interface CharacterRes {
	results: Character[];
	count: number;
	next: string | null;
	previous: string | null;
}

interface Character {
	name: string;
	height: number;
	mass: number;
	birth_year: string;
}

const columns = [
	{ name: "Name", id: "name", isRowHeader: true },
	{ name: "Height", id: "height" },
	{ name: "Mass", id: "mass" },
	{ name: "Birth Year", id: "birth_year" },
];

export default function CheckboxPage() {
	const list = useAsyncList<Character>({
		async load({ signal }) {
			const res = await fetch(
				`https://swapi.py4e.com/api/people/?search`,
				{
					signal,
				},
			);
			const json = (await res.json()) as CharacterRes;
			const updatedRes = json.results.map((item, index) => ({
				...item,
				id: item.name + "-" + index,
				height: Number(item.height),
				mass: Number(item.mass),
			}));
			return {
				items: updatedRes,
			};
		},
		async sort({ items, sortDescriptor }) {
			return {
				items: items.sort((a, b) => {
					const first = a[sortDescriptor.column as keyof Character];
					const second = b[sortDescriptor.column as keyof Character];

					let cmp: number;

					if (
						typeof first === "number" &&
						typeof second === "number"
					) {
						cmp = first - second; // Numeric comparison
					} else if (
						typeof first === "string" &&
						typeof second === "string"
					) {
						cmp = first.localeCompare(second); // Alphabetical comparison
					} else {
						cmp = 0; // Default case, although this should never be reached
					}

					if (sortDescriptor.direction === "descending") {
						cmp *= -1;
					}
					return cmp;
				}),
			};
		},
	});

	const { dragAndDropHooks } = useDragAndDrop({
		getItems: (keys) =>
			[...keys].map((key) => ({
				"text/plain": list.getItem(key).name,
			})),
		onReorder(e) {
			if (e.target.dropPosition === "before") {
				list.moveBefore(e.target.key, e.keys);
			} else if (e.target.dropPosition === "after") {
				list.moveAfter(e.target.key, e.keys);
			}
		},
	});

	return (
		<div className="rounded-md border">
			<Table
				aria-label="Files"
				selectionMode="multiple"
				sortDescriptor={list.sortDescriptor}
				onSortChange={(e) => {
					list.sort(e);
				}}
				dragAndDropHooks={dragAndDropHooks}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							isRowHeader={column.isRowHeader}
							allowsSorting
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody
					items={list.items}
					renderEmptyState={() => (
						<TableBodyEmptyState>
							No results found
						</TableBodyEmptyState>
					)}
				>
					{(item) => (
						<TableRow columns={columns}>
							{(column) => (
								<TableCell>
									{item[column.id as keyof Character]}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
