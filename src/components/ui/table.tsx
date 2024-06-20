"use client";

import * as React from "react";

import {
	Cell,
	type CellProps,
	Collection,
	Column,
	type ColumnProps,
	Row,
	type RowProps,
	Table as _Table,
	TableBody as _TableBody,
	type TableBodyProps as _TableBodyProps,
	TableHeader as _TableHeader,
	type TableHeaderProps as _TableHeaderProps,
	type TableProps as _TableProps,
	useTableOptions,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown, GripVertical } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";

interface TableProps extends _TableProps {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
	({ className, ...props }, ref) => {
		return (
			<div className="relative w-full overflow-auto">
				<_Table
					ref={ref}
					className={(values) =>
						cn(
							"w-full caption-bottom text-sm",
							typeof className === "function"
								? className(values)
								: className,
						)
					}
					{...props}
				/>
			</div>
		);
	},
);
Table.displayName = "Table";

interface TableHeaderProps<T> extends _TableHeaderProps<T> {}

function TableHeader<T extends object>({
	className,
	children,
	columns,
	...props
}: TableHeaderProps<T>) {
	const { selectionBehavior, selectionMode, allowsDragging } =
		useTableOptions();

	return (
		<_TableHeader className={cn("[&_tr]:border-b", className)} {...props}>
			{allowsDragging && <TableColumn />}
			{selectionBehavior === "toggle" && (
				<TableColumn>
					{selectionMode === "multiple" && (
						<Checkbox slot="selection" />
					)}
				</TableColumn>
			)}
			<Collection items={columns}>{children}</Collection>
		</_TableHeader>
	);
}

interface TableColumnDefs<T extends object>
	extends Pick<ColumnProps, "isRowHeader" | "allowsSorting"> {
	id: keyof T;
	header: string | (() => React.ReactNode);
	cell?: (item: T) => React.ReactNode;
}

const TableColumn = React.forwardRef<HTMLTableCellElement, ColumnProps>(
	({ className, children, ...props }, ref) => {
		const { selectionBehavior } = useTableOptions();
		const hasSelect = selectionBehavior === "toggle";

		return (
			<Column
				ref={ref}
				className={(values) =>
					cn(
						"p-4 text-left align-middle font-medium text-muted-foreground",
						hasSelect && "pr-0",
						(values.isFocused || values.isFocusVisible) &&
							"outline-none ring-2 ring-ring ring-offset-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				{...props}
			>
				{(values) => (
					<>
						{values.allowsSorting ? (
							<Button
								size="xs"
								aria-hidden="true"
								variant="ghost"
								onPress={() =>
									values.sort(
										values.sortDirection === "ascending"
											? "descending"
											: "ascending",
									)
								}
							>
								{typeof children === "function"
									? children(values)
									: children}
								{values.sortDirection === "ascending" && (
									<ArrowUp className="ml-2 size-4" />
								)}
								{values.sortDirection === "descending" && (
									<ArrowDown className="ml-2 size-4" />
								)}
								{!values.sortDirection && (
									<ArrowUpDown className="ml-2 size-4" />
								)}
							</Button>
						) : typeof children === "function" ? (
							children(values)
						) : (
							children
						)}
					</>
				)}
			</Column>
		);
	},
);
TableColumn.displayName = "TableColumn";

interface TableBodyProps<T> extends _TableBodyProps<T> {}

function TableBody<T extends object>({
	className,
	...props
}: TableBodyProps<T>) {
	return (
		<_TableBody
			className={cn(
				"[&>.react-aria-DropIndicator]:border-2 [&>.react-aria-DropIndicator]:border-black [&_tr:last-child]:border-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow<T extends object>({
	id,
	columns,
	children,
	className,
	...props
}: RowProps<T>) {
	const { selectionBehavior, allowsDragging } = useTableOptions();

	return (
		<Row
			id={id}
			className={(values) =>
				cn(
					"border-b transition-all data-[hovered]:bg-muted/50 data-[selected]:bg-muted",
					values.isDragging && "opacity-20",
					values.isDisabled && "text-primary/50",
					(values.isFocused || values.isFocusVisible) &&
						"outline-none ring-2 ring-ring ring-offset-2",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{allowsDragging && (
				<TableCell>
					<Button
						variant="ghost"
						slot="drag"
						size="icon"
						className=""
					>
						<GripVertical className="size-4" />
					</Button>
				</TableCell>
			)}
			{selectionBehavior === "toggle" && (
				<TableCell>
					<Checkbox isDisabled={props.isDisabled} slot="selection" />
				</TableCell>
			)}
			<Collection items={columns}>{children}</Collection>
		</Row>
	);
}

const TableCell = React.forwardRef<HTMLTableCellElement, CellProps>(
	({ className, ...props }, ref) => {
		const { selectionBehavior } = useTableOptions();
		const hasSelect = selectionBehavior === "toggle";

		return (
			<Cell
				ref={ref}
				className={(values) =>
					cn(
						"p-4 align-middle",
						hasSelect && "pr-0",
						(values.isFocused || values.isFocusVisible) &&
							"outline-none ring-2 ring-ring ring-offset-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				{...props}
			/>
		);
	},
);
TableCell.displayName = "TableCell";

const TableBodyEmptyState = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<div className="grid place-items-center py-8">
		<span
			ref={ref}
			className={cn("text-sm [&_p]:leading-relaxed", className)}
			{...props}
		/>
	</div>
));
TableBodyEmptyState.displayName = "TableCellEmptyState";

export {
	Table,
	type TableHeaderProps,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	TableBodyEmptyState,
	type TableColumnDefs,
};
