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

import { useAsyncList } from "react-stately";

const columns = [
	{ name: "Name", id: "name", isRowHeader: true },
	{ name: "Type", id: "type" },
	{ name: "Date Modified", id: "date" },
];

const rows = [
	{ id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
	{ id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
	{ id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
	{ id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
];

export default function CheckboxPage() {
	const list = useAsyncList<typeof rows>({
		async load({ signal }) {
			return {
				items: [],
			};
		},
		async sort({ items, sortDescriptor }) {
			return {
				items: items.sort((a, b) => {
					const first =
						a[sortDescriptor.column as keyof typeof columns];
					const second =
						b[sortDescriptor.column as keyof typeof columns];

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
						cmp = (first as string).localeCompare(second); // Alphabetical comparison
					} else if (typeof first === "number") {
						cmp = -1; // Numbers come before strings
					} else if (typeof second === "number") {
						cmp = 1; // Strings come after numbers
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

	return (
		<div className="grid gap-8">
			<Table aria-label="Files" selectionMode="multiple">
				<TableHeader>
					<TableColumn isRowHeader>Name</TableColumn>
					<TableColumn allowsSorting>Type</TableColumn>
					<TableColumn>Date Modified</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow isDisabled>
						<TableCell>Games</TableCell>
						<TableCell>File folder</TableCell>
						<TableCell>6/7/2020</TableCell>
					</TableRow>
					<TableRow isDisabled>
						<TableCell>Program Files</TableCell>
						<TableCell>File folder</TableCell>
						<TableCell>4/7/2021</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>bootmgr</TableCell>
						<TableCell>System file</TableCell>
						<TableCell>11/20/2010</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Table
				aria-label="Files"
				selectionMode="multiple"
				disabledBehavior="all"
			>
				<TableHeader>
					<TableColumn isRowHeader>Name</TableColumn>
					<TableColumn allowsSorting>Type</TableColumn>
					<TableColumn>Date Modified</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow isDisabled>
						<TableCell>Games</TableCell>
						<TableCell>File folder</TableCell>
						<TableCell>6/7/2020</TableCell>
					</TableRow>
					<TableRow isDisabled>
						<TableCell>Program Files</TableCell>
						<TableCell>File folder</TableCell>
						<TableCell>4/7/2021</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>bootmgr</TableCell>
						<TableCell>System file</TableCell>
						<TableCell>11/20/2010</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Table
				aria-label="Files"
				selectionMode="single"
				sortDescriptor={list.sortDescriptor}
				onSortChange={list.sort}
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
									{item[column.id as keyof typeof item]}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
