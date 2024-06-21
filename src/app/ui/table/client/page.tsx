"use client";

import {
	Pagination,
	PaginationContent,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableBodyEmptyState,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { type DropPosition, useDragAndDrop } from "react-aria-components";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { SearchField, SearchFieldInput } from "@/components/ui/search-field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectPopover,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCallback, useMemo, useState } from "react";
import { type Key, type Selection, type SortDescriptor } from "react-stately";
import { type User, columns, statuses } from "./column-defs";
import { users } from "./data";

function getPaginatedItems(page: number, rowsPerPage: number) {
	const start = (page - 1) * rowsPerPage;
	const end = start + rowsPerPage;

	return users.slice(start, end);
}

function getSearchItem(searchTerm: string) {
	return users.filter((user) =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
}

export default function DataTable() {
	const [page, setPage] = useState(1);

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [items, setItems] = useState<User[]>(
		getPaginatedItems(page, rowsPerPage),
	);

	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

	const [statusFilter, setStatusFilter] = useState<Selection>("all");

	const [currentSearchTerm, setCurrentSearchTerm] = useState("");

	const pages = useMemo(() => {
		return Math.ceil(users.length / rowsPerPage);
	}, [rowsPerPage]);

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

	const sortItem = useCallback(
		(e: SortDescriptor) => {
			const sortedItems = [...items].sort((a, b) => {
				const first = a[e.column as keyof User];
				const second = b[e.column as keyof User];

				let cmp: number;

				if (typeof first === "number" && typeof second === "number") {
					cmp = first - second; // Numeric comparison
				} else if (
					typeof first === "string" &&
					typeof second === "string"
				) {
					cmp = first.localeCompare(second); // Alphabetical comparison
				} else {
					cmp = 0; // Default case, although this should never be reached
				}

				if (e.direction === "descending") {
					cmp *= -1;
				}
				return cmp;
			});
			setItems(sortedItems);
		},
		[items],
	);

	const getItem = useCallback(
		(key: Key) => {
			return items.find((item) => item.id === key)!;
		},
		[items],
	);

	const moveItems = useCallback(
		<T extends User>(
			array: T[],
			targetKey: Key,
			keysToMove: Key[],
			position: DropPosition,
		) => {
			const targetIndex = array.findIndex(
				(item) => item.id === targetKey,
			);
			const itemsToMove = keysToMove.map(
				(key) => array.find((item) => item.id === key)!,
			);

			// Remove items to move from the array
			const filteredArray = array.filter(
				(item) => !keysToMove.includes(item.id),
			);

			// Determine the new index for insertion
			const insertIndex =
				position === "before" ? targetIndex : targetIndex + 1;

			// Insert items to move at the determined index
			filteredArray.splice(insertIndex, 0, ...itemsToMove);

			return filteredArray;
		},
		[],
	);

	const { dragAndDropHooks } = useDragAndDrop({
		getItems: (keys) =>
			[...keys].map((key) => ({
				"text/plain": getItem(key).name,
			})),
		onReorder(e) {
			const itemsArray = [...items]; // Create a copy of listData

			if (e.target.dropPosition === "before") {
				const newListData = moveItems(
					itemsArray,
					e.target.key,
					[...e.keys],
					"before",
				);
				setItems(newListData);
			} else if (e.target.dropPosition === "after") {
				const newListData = moveItems(
					itemsArray,
					e.target.key,
					[...e.keys],
					"after",
				);
				setItems(newListData);
			}
		},
	});

	const hasSearchFilter = Boolean(currentSearchTerm);

	const onPageChange = useCallback(
		(currentPage: number) => {
			setPage(currentPage);
			setItems(getPaginatedItems(currentPage, rowsPerPage));
		},
		[rowsPerPage],
	);

	const onRowsPerPageChange = useCallback((page: Key) => {
		setRowsPerPage(Number(page));
		setPage(1);
	}, []);

	const onSearchChange = useCallback(
		(value: string) => {
			if (value) {
				setCurrentSearchTerm(value);
				setPage(1);
				setItems(getSearchItem(value));
			} else {
				setCurrentSearchTerm("");
				setItems(getPaginatedItems(page, rowsPerPage));
			}
		},
		[page, rowsPerPage],
	);

	// const onClear = React.useCallback(()=>{
	//   setFilterValue("")
	//   setPage(1)
	// },[])

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-1 items-center space-x-2">
					<SearchField
						value={currentSearchTerm}
						onChange={onSearchChange}
					>
						<SearchFieldInput
							placeholder="Search for name"
							className="max-w-sm"
						/>
					</SearchField>

					<PopoverTrigger>
						<Button variant="outline">Status</Button>
						<Popover>
							<Card className="p-2">
								<GridList
									aria-label="Statuses"
									selectionMode="multiple"
									items={statuses}
									selectedKeys={statusFilter}
									onSelectionChange={setStatusFilter}
								>
									{(item) => (
										<GridListItem key={item.id}>
											<div className="flex w-full items-center justify-between">
												{item.name}
											</div>
										</GridListItem>
									)}
								</GridList>
							</Card>
						</Popover>
					</PopoverTrigger>
				</div>
				<Button variant="outline">View</Button>
			</div>

			<div className="relative w-full rounded-md border">
				<Table
					aria-label="Users"
					selectionMode="multiple"
					selectedKeys={selectedKeys}
					onSelectionChange={setSelectedKeys}
					sortDescriptor={sortDescriptor}
					onSortChange={(e) => {
						setSortDescriptor(e);
						sortItem(e);
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
						items={items}
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
											: item[column.id as keyof User]}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between px-2">
				<span className="flex-1 text-sm text-muted-foreground">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${users.length} selected`}
				</span>
				<div className="flex items-center space-x-6 lg:space-x-8">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium">
							Rows per page
						</span>
						<Select
							placeholder="Select an item"
							aria-label="item selection"
							selectedKey={rowsPerPage}
							onSelectionChange={onRowsPerPageChange}
						>
							<SelectTrigger className="h-8 w-[70px]">
								<SelectValue />
							</SelectTrigger>
							<SelectPopover>
								<SelectContent aria-label="items">
									<SelectItem id={5}>5</SelectItem>
									<SelectItem id={10}>10</SelectItem>
									<SelectItem id={15}>15</SelectItem>
								</SelectContent>
							</SelectPopover>
						</Select>
					</div>
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Page {page} of {pages}
					</div>
					<Pagination
						className="w-fit space-x-2"
						total={pages}
						boundaries={1}
						siblings={1}
						initialPage={page}
						onChange={onPageChange}
					>
						{(pagination) => (
							<PaginationContent>
								<PaginationItem>
									<PaginationFirst
										className="size-8"
										variant="outline"
										iconOnly
										isDisabled={pagination.isFirstPage}
										onPress={() => {
											pagination.first();
										}}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationPrevious
										className="size-8"
										variant="outline"
										iconOnly
										isDisabled={pagination.isFirstPage}
										onPress={() => {
											pagination.previous();
										}}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationNext
										className="size-8"
										variant="outline"
										iconOnly
										isDisabled={pagination.isLastPage}
										onPress={() => {
											pagination.next();
										}}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationLast
										className="size-8"
										variant="outline"
										iconOnly
										isDisabled={pagination.isLastPage}
										onPress={() => {
											pagination.last();
										}}
									/>
								</PaginationItem>
							</PaginationContent>
						)}
					</Pagination>
				</div>
			</div>
		</div>
	);
}
