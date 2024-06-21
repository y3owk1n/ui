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
import { type DropPosition, useDragAndDrop } from "react-aria-components";

import { useDebouncedValue } from "@/hooks/use-debounce-value";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Key, type SortDescriptor } from "react-stately";
import { type Character, type CharacterWithId, columns } from "./column-defs";
import { SearchField, SearchFieldInput } from "@/components/ui/search-field";

interface DataTableProps {
	items: CharacterWithId[];
	totalPages: number;
	currentPage: number;
	searchTerm: string;
}

const pageSize = 10;

export default function DataTable(props: DataTableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = useMemo(() => {
		return new URLSearchParams(searchParams.toString());
	}, [searchParams]);

	const isDesktop = useMediaQuery("(min-width: 768px)");

	const [items, setItems] = useState<CharacterWithId[]>(props.items);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setItems(props.items);
		setIsLoading(false);
	}, [props.items]);

	const [currentSearchTerm, setCurrentSearchTerm] = useState(
		props.searchTerm,
	);
	useDebouncedValue(currentSearchTerm, 1000, {}, (value) => {
		params.set("s", value);
		router.push(`?${params.toString()}`);
	});

	const pages = useMemo(() => {
		return Math.ceil(props.totalPages / pageSize);
	}, [props.totalPages]);

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

	const sortItem = useCallback(
		(e: SortDescriptor) => {
			const sortedItems = [...items].sort((a, b) => {
				const first = a[e.column as keyof Character];
				const second = b[e.column as keyof Character];

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
		<T extends CharacterWithId>(
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

	return (
		<div className="space-y-4">
			<div className="flex items-center">
				<SearchField
					value={currentSearchTerm}
					onChange={(value) => {
						setCurrentSearchTerm(value);
						setIsLoading(true);
					}}
				>
					<SearchFieldInput
						placeholder="Search for name"
						className="max-w-sm"
					/>
				</SearchField>
			</div>

			<div className="relative w-full rounded-md border">
				<Table
					isLoading={isLoading}
					aria-label="Files"
					selectionMode="multiple"
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
				total={pages}
				boundaries={1}
				siblings={1}
				initialPage={props.currentPage}
				onChange={(page) => {
					setIsLoading(true);
					params.set("page", page.toString());
					router.push(`?${params.toString()}`);
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
