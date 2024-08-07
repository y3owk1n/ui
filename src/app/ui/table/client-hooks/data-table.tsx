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

import { useTable } from "@/hooks/use-table";
import { parseParamsToSet } from "@/lib/utils";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { type User, columns, statuses } from "./column-defs";
import { users } from "./data";

export default function DataTable() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = useMemo(() => {
		return new URLSearchParams(searchParams.toString());
	}, [searchParams]);

	const table = useTable({
		data: users,
		columns: columns,
		defaults: {},
		options: {
			search: {
				type: "client",
				searchFilterFn: (data, term) =>
					data.filter((user) =>
						user.name.toLowerCase().includes(term.toLowerCase()),
					),
			},
		},
		filters: [
			{
				type: "client",
				name: "status",
				selection: parseParamsToSet(params.get("status")) ?? "all",
				filterFn: (data, selection) => {
					if (
						selection !== "all" &&
						Array.from(selection).length !== statuses.length
					) {
						return data.filter((user) =>
							Array.from(selection).includes(user.status),
						);
					}
					return data;
				},
				onFilterSuccess: (data) => {
					params.set("status", data.toString());
					router.push(`?${params.toString()}`);
				},
			},
		],
	});

	return (
		<div className="space-y-4">
			<div className="flex flex-col flex-wrap gap-2 md:flex-row md:items-center md:justify-between">
				<div className="flex flex-1 flex-wrap items-center gap-2">
					<SearchField
						className="w-full"
						value={table.state.searchTerm}
						onChange={table.handler.onSearchChange}
						onClear={table.handler.onSearchClear}
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
							{table.getter.filter("status")?.length > 0 && (
								<>
									<Separator
										orientation="vertical"
										className="mx-2 h-4"
									/>
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{table.getter.filter("status")?.length}{" "}
										selected
									</Badge>
								</>
							)}
						</Button>
						<Popover>
							<Card className="p-2">
								<GridList
									aria-label="Statuses"
									selectionMode="multiple"
									disallowEmptySelection
									items={statuses}
									selectedKeys={
										table.getter.filter("status").data
											?.selection
									}
									onSelectionChange={
										table.getter.filter("status").setFilter
									}
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
									selectedKeys={table.state.visibleColumns}
									onSelectionChange={
										table.setter.setVisibleColumns
									}
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
					selectedKeys={table.state.selectedKeys}
					onSelectionChange={table.setter.setSelectedKeys}
					sortDescriptor={table.state.sortDescriptor}
					onSortChange={table.setter.setSortDescriptor}
					dragAndDropHooks={table.state.dragAndDropHooks}
				>
					<TableHeader columns={table.data.columns}>
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
						dependencies={[
							table.data.items,
							table.state.visibleColumns,
						]}
						items={table.data.items}
						renderEmptyState={() => (
							<TableBodyEmptyState>
								No results found
							</TableBodyEmptyState>
						)}
					>
						{(item) => (
							<TableRow columns={table.data.columns}>
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
					{table.state.selectedKeys === "all"
						? "All items selected"
						: `${table.state.selectedKeys.size} of ${table.data.raw.length} selected`}
				</span>
				<div className="flex flex-col items-center gap-2 md:flex-row lg:gap-8">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium">
							Rows per page
						</span>
						<Select
							placeholder="Select an item"
							aria-label="item selection"
							selectedKey={table.state.rowsPerPage}
							onSelectionChange={
								table.handler.onRowsPerPageChange
							}
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
						Page {table.state.page} of {table.state.totalPages}
					</div>
					<Pagination
						className="w-fit space-x-2"
						total={table.state.totalPages}
						boundaries={1}
						siblings={1}
						initialPage={table.state.page}
						onChange={table.handler.onPageChange}
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
