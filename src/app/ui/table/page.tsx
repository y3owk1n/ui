"use client";

import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableBodyEmptyState,
	TableCell,
	TableColumn,
	type TableColumnDefs,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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

const columns: TableColumnDefs<Character>[] = [
	{
		header: "Name",
		id: "name",
		isRowHeader: true,
	},
	{
		header: "Height",
		allowsSorting: true,
		id: "height",
		cell: (item) => <span>{item.height} cm</span>,
	},
	{
		header: "Mass",
		id: "mass",
		allowsSorting: true,
		cell: (item) => <span>{item.mass} kg</span>,
	},
	{ header: "Birth Year", id: "birth_year" },
];

export default function CheckboxPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const currentPage = params.get("page");
	const [totalPages, setTotalPages] = useState(0);

	const list = useAsyncList<Character>({
		async load({ signal, filterText }) {
			const res = await fetch(
				`https://swapi.py4e.com/api/people/?search=${filterText}&page=${currentPage}`,
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
			setTotalPages(Math.ceil(json.count / 10));
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
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter emails..."
					value={list.filterText}
					onChange={(event) => list.setFilterText(event.target.value)}
					className="max-w-sm"
				/>
			</div>

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
								allowsSorting={column.allowsSorting}
							>
								{column.header}
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
										{column.cell
											? column.cell(item)
											: item[column.id]}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination
				total={totalPages}
				boundaries={1}
				initialPage={currentPage}
				onChange={(page) => {
					params.set("page", page.toString());
					router.push(`?${params.toString()}`);
					list.reload();
				}}
			>
				{(pagination) => (
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								isDisabled={pagination.isFirstPage}
								onPress={() => {
									pagination.previous();
								}}
							/>
						</PaginationItem>
						{pagination.range.map((page, index) => (
							<PaginationItem key={index}>
								{page === "dots" ? (
									<PaginationEllipsis />
								) : (
									<PaginationLink
										isActive={pagination.active === page}
										onPress={() => {
											pagination.setPage(page);
										}}
									>
										{page}
									</PaginationLink>
								)}
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								isDisabled={pagination.isLastPage}
								onPress={() => {
									pagination.next();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				)}
			</Pagination>
		</div>
	);
}
