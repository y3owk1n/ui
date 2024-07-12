"use client";

import {
	Pagination,
	PaginationContent,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationNext,
	PaginationPrevious,
} from "@/registry/ui/pagination";
import {
	Table,
	TableBody,
	TableBodyEmptyState,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@/registry/ui/table";
import { type DropPosition, useDragAndDrop } from "react-aria-components";

import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Card } from "@/registry/ui/card";
import { GridList, GridListItem } from "@/registry/ui/grid-list";
import { Popover, PopoverTrigger } from "@/registry/ui/popover";
import { SearchField, SearchFieldInput } from "@/registry/ui/search-field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectPopover,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { PlusCircle, Settings2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { type Key, type Selection, type SortDescriptor } from "react-stately";
import { type User, columns, statuses } from "./column-defs";
import { users } from "./data";

export default function DataTable() {
	const [page, setPage] = useState(1);

	const [rawItems, setRawItems] = useState<User[]>(users);

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

	const [statusFilter, setStatusFilter] = useState<Selection>("all");

	const [visibleColumns, setVisibleColumns] = useState<Selection>("all");

	const [currentSearchTerm, setCurrentSearchTerm] = useState("");

	const hasSearchFilter = Boolean(currentSearchTerm);

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.id),
		);
	}, [visibleColumns]);

	const filteredItems = useMemo(() => {
		let filteredUsers = [...rawItems];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name
					.toLowerCase()
					.includes(currentSearchTerm.toLowerCase()),
			);
		}

		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statuses.length
		) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status),
			);
		}

		return filteredUsers;
	}, [currentSearchTerm, hasSearchFilter, rawItems, statusFilter]);

	const pages = useMemo(() => {
		return Math.ceil(filteredItems.length / rowsPerPage);
	}, [filteredItems.length, rowsPerPage]);

	const selectedStatusValues = useMemo(() => {
		return Array.from(statusFilter);
	}, [statusFilter]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor?.column as keyof User];
			const second = b[sortDescriptor?.column as keyof User];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor?.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const getItem = useCallback(
		(key: Key) => {
			return rawItems.find((item) => item.id === key)!;
		},
		[rawItems],
	);

	const moveItems = useCallback(
		<T extends User>(
			array: T[],
			targetKey: Key,
			keysToMove: Key[],
			position: DropPosition,
		) => {
			const itemsToMove = keysToMove.map(
				(key) => array.find((item) => item.id === key)!,
			);

			// Remove items to move from the array
			const filteredArray = array.filter(
				(item) => !keysToMove.includes(item.id),
			);

			const targetIndex = filteredArray.findIndex(
				(item) => item.id === targetKey,
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
			const itemsArray = [...rawItems]; // Create a copy of listData

			if (e.target.dropPosition === "before") {
				const newListData = moveItems(
					itemsArray,
					e.target.key,
					[...e.keys],
					"before",
				);
				setRawItems(newListData);
			} else if (e.target.dropPosition === "after") {
				const newListData = moveItems(
					itemsArray,
					e.target.key,
					[...e.keys],
					"after",
				);
				setRawItems(newListData);
			}
		},
	});

	const onPageChange = useCallback((currentPage: number) => {
		setPage(currentPage);
	}, []);

	const onRowsPerPageChange = useCallback((page: Key) => {
		setRowsPerPage(Number(page));
		setPage(1);
	}, []);

	const onSearchChange = useCallback((value: string) => {
		if (value) {
			setCurrentSearchTerm(value);
			setPage(1);
		} else {
			setCurrentSearchTerm("");
		}
	}, []);

	const onSearchClear = useCallback(() => {
		setCurrentSearchTerm("");
		setPage(1);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex flex-col flex-wrap gap-2 md:flex-row md:items-center md:justify-between">
				<div className="flex flex-1 flex-wrap items-center gap-2">
					<SearchField
						className="w-full"
						value={currentSearchTerm}
						onChange={onSearchChange}
						onClear={onSearchClear}
					>
						<SearchFieldInput
							placeholder="Search for name"
							className="w-full flex-1 md:max-w-sm"
						/>
					</SearchField>

					<PopoverTrigger>
						<Button variant="outline" className="border-dashed">
							<PlusCircle className="mr-2 size-4" />
							Status
							{selectedStatusValues.length > 0 && (
								<>
									<Separator
										orientation="vertical"
										className="mx-2 h-4"
									/>
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedStatusValues.length} selected
									</Badge>
								</>
							)}
						</Button>
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
				<div>
					<PopoverTrigger>
						<Button variant="outline">
							<Settings2 className="mr-2 h-4 w-4" />
							View
						</Button>

						<Popover>
							<Card className="p-2">
								<GridList
									aria-label="Views"
									selectionMode="multiple"
									disallowEmptySelection
									items={columns}
									selectedKeys={visibleColumns}
									onSelectionChange={setVisibleColumns}
								>
									{(item) => (
										<GridListItem key={item.id}>
											<div className="flex w-full items-center justify-between">
												{item.header}
											</div>
										</GridListItem>
									)}
								</GridList>
							</Card>
						</Popover>
					</PopoverTrigger>
				</div>
			</div>

			<div className="relative w-full rounded-md border">
				<Table
					aria-label="Users"
					selectionMode="multiple"
					selectedKeys={selectedKeys}
					onSelectionChange={setSelectedKeys}
					sortDescriptor={sortDescriptor}
					onSortChange={setSortDescriptor}
					dragAndDropHooks={dragAndDropHooks}
				>
					<TableHeader columns={headerColumns}>
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
						dependencies={[sortedItems, visibleColumns]}
						items={sortedItems}
						renderEmptyState={() => (
							<TableBodyEmptyState>
								No results found
							</TableBodyEmptyState>
						)}
					>
						{(item) => (
							<TableRow columns={headerColumns}>
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

			<div className="flex flex-col items-center justify-between gap-2 px-2 md:flex-row">
				<span className="flex-1 text-sm text-muted-foreground">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${users.length} selected`}
				</span>
				<div className="flex flex-col items-center gap-2 md:flex-row lg:gap-8">
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
