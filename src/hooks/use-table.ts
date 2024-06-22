import { type Key, type Selection, type SortDescriptor } from "react-stately";
import { useState, useMemo, useCallback } from "react";
import { type DropPosition, useDragAndDrop } from "react-aria-components";

interface UseTableFilter<T> {
	/** Name of the filter in string */
	name: string;
	/** Selection of the filter state */
	selection: Selection;
	/** Function to run for this filter */
	filterFn: (data: T[], selection: Selection) => T[];
}

interface UseTableDefaults {
	/** Search term, defaults to "" */
	searchTerm?: string;
	/** Search term, defaults to undefined */
	sortDescriptor?: SortDescriptor;
	/** Rows per page, defaults to 5 */
	rowsPerPage?: number;
	/** Current page, defaults to 1 */
	page?: number;
	/** Visible columns, defaults to "all" */
	visibleColumns?: Selection;
	/** Selected keys, defaults to new Set([]) */
	selectedKeys?: Selection;
}

interface UseTableProps<T, U> {
	data: T[];
	columns: U[];
	defaults: UseTableDefaults;
	filters?: UseTableFilter<T>[];
	searchFilterFn?: (data: T[], currentSearchTerm: string) => T[];
}

export function useTable<
	T extends object & { id: string | number; name: string },
	U extends object & { id: string | number },
>({
	data,
	columns,
	filters: initialFilters = [],
	defaults: {
		searchTerm: initialSearchTerm = "",
		sortDescriptor: initialSortDescriptor,
		rowsPerPage: initialRowsPerPage = 5,
		page: initialPage = 1,
		visibleColumns: initialVisibleColumns = "all",
		selectedKeys: initialSelectedKeys = new Set([]),
	},
	searchFilterFn,
}: UseTableProps<T, U>) {
	const [page, setPage] = useState(initialPage);
	const [rawData, setRawData] = useState<T[]>(data);
	const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
	const [selectedKeys, setSelectedKeys] =
		useState<Selection>(initialSelectedKeys);
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		initialVisibleColumns,
	);
	const [currentSearchTerm, setCurrentSearchTerm] =
		useState(initialSearchTerm);
	const [sortDescriptor, setSortDescriptor] = useState<
		SortDescriptor | undefined
	>(initialSortDescriptor);
	const [filters, setFilters] = useState<UseTableFilter<T>[]>(initialFilters);

	const hasSearchFilter = Boolean(currentSearchTerm);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columns;
		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.id),
		);
	}, [visibleColumns, columns]);

	const filteredData = useMemo(() => {
		let filteredData = [...rawData];
		if (hasSearchFilter && searchFilterFn) {
			filteredData = searchFilterFn(filteredData, currentSearchTerm);
		}
		for (const filter of filters) {
			filteredData = filter.filterFn(filteredData, filter.selection);
		}
		return filteredData;
	}, [rawData, hasSearchFilter, searchFilterFn, currentSearchTerm, filters]);

	const totalPages = useMemo(() => {
		return Math.ceil(filteredData.length / rowsPerPage);
	}, [filteredData.length, rowsPerPage]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredData.slice(start, end);
	}, [page, filteredData, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			if (sortDescriptor) {
				const first = a[sortDescriptor.column as keyof T];
				const second = b[sortDescriptor.column as keyof T];
				const cmp = first < second ? -1 : first > second ? 1 : 0;
				return sortDescriptor?.direction === "descending" ? -cmp : cmp;
			}
			return 0;
		});
	}, [sortDescriptor, items]);

	const getItem = useCallback(
		(key: Key) => {
			return rawData.find((item) => item.id === key)!;
		},
		[rawData],
	);

	const moveItems = useCallback(
		<T extends Record<string, string> | { id: string | number }>(
			array: T[],
			targetKey: Key,
			keysToMove: Key[],
			position: DropPosition,
		) => {
			const itemsToMove = keysToMove.map(
				(key) => array.find((item) => item.id === key)!,
			);
			const filteredArray = array.filter(
				(item) => !keysToMove.includes(item.id),
			);
			const targetIndex = filteredArray.findIndex(
				(item) => item.id === targetKey,
			);
			const insertIndex =
				position === "before" ? targetIndex : targetIndex + 1;
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
			const itemsArray = [...rawData];
			if (e.target.dropPosition === "before") {
				const newListData = moveItems(
					itemsArray,
					e.target.key,
					[...e.keys],
					"before",
				);
				setRawData(newListData);
			} else if (e.target.dropPosition === "after") {
				const newListData = moveItems(
					itemsArray,
					e.target.key,
					[...e.keys],
					"after",
				);
				setRawData(newListData);
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

	const getFilter = useCallback(
		(name: UseTableFilter<T>["name"]) => {
			const data = filters.find((f) => f.name === name);

			if (!data)
				throw Error(
					`Filter for "${name}" not found, do you mean "${filters.map((f) => f.name).join("or ")}"? Check any code that uses "table.getter.filter(${name})"`,
				);

			return {
				data,
				length: data?.selection
					? Array.from(data?.selection).length
					: 0,
				setFilter: (selection: Selection) =>
					setFilters((previousFilter) => {
						const cleanFilter = previousFilter.filter(
							(f) => f.name !== name,
						);

						return [
							...cleanFilter,
							{
								...data,
								selection,
							},
						];
					}),
			};
		},
		[filters],
	);

	return {
		state: {
			page,
			rowsPerPage,
			selectedKeys,
			visibleColumns,
			searchTerm: currentSearchTerm,
			sortDescriptor,
			totalPages,
			dragAndDropHooks,
			filters,
		},
		setter: {
			setPage,
			setRowsPerPage,
			setSelectedKeys,
			setVisibleColumns,
			setCurrentSearchTerm,
			setSortDescriptor,
		},
		handler: {
			onPageChange,
			onRowsPerPageChange,
			onSearchChange,
			onSearchClear,
		},
		getter: {
			filter: getFilter,
		},
		data: {
			columns: headerColumns,
			raw: data,
			items: sortedItems,
		},
	};
}
