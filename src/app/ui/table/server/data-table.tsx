"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationText,
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
import { useRouter, useSearchParams } from "next/navigation";

import { SearchField, SearchFieldInput } from "@/components/ui/search-field";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMemo } from "react";
import { type CharacterWithId, columns } from "./column-defs";
import { useTable } from "@/hooks/use-table";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GridList, GridListItem } from "@/components/ui/grid-list";

interface DataTableProps {
	items: CharacterWithId[];
	totalPages: number;
	currentPage: number;
	searchTerm: string;
}

export default function DataTable(props: DataTableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = useMemo(() => {
		return new URLSearchParams(searchParams.toString());
	}, [searchParams]);

	const table = useTable({
		data: props.items,
		columns: columns,
		defaults: {
			totalItemsCount: props.totalPages,
			searchTerm: props.searchTerm,
			rowsPerPage: 10,
			page: props.currentPage,
		},
		options: {
			search: {
				type: "server",
			},
			drag: {
				onDragSuccess: (data, setter) => {
					alert("hello");
					setter(data);
				},
			},
		},
		filters: [],
	});

	const isDesktop = useMediaQuery("(min-width: 768px)");

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<SearchField
						value={table.state.searchTerm}
						onChange={(value) => {
							table.handler.onSearchChange(value);
							params.set("s", value);
							router.push(`?${params.toString()}`);
						}}
						onClear={() => {
							table.handler.onSearchClear();
							params.set("s", "");
							router.push(`?${params.toString()}`);
						}}
					>
						<SearchFieldInput
							placeholder="Search for name"
							className="max-w-sm"
						/>
					</SearchField>
				</div>

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

			<div className="relative w-full rounded-md border">
				<Table
					isLoading={table.state.isLoading}
					aria-label="Files"
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
											: item[
													column.id as keyof CharacterWithId
												]}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination
				total={table.state.totalPages}
				boundaries={1}
				siblings={1}
				initialPage={table.state.page}
				onChange={(page) => {
					params.set("page", page.toString());
					router.push(`?${params.toString()}`);
					table.handler.onPageChange(page);
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
						{isDesktop ? (
							pagination.range.map((page, index) => (
								<PaginationItem key={index}>
									{page === "dots" ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											isActive={
												pagination.active === page
											}
											onPress={() => {
												pagination.setPage(page);
											}}
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))
						) : (
							<PaginationItem>
								<PaginationText>
									Page {pagination.active}
								</PaginationText>
							</PaginationItem>
						)}
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
