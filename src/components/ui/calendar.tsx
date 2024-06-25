"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	type DateValue,
	Heading,
	type HeadingProps,
	RangeCalendarStateContext,
	Calendar as _Calendar,
	CalendarCell as _CalendarCell,
	type CalendarCellProps as _CalendarCellProps,
	CalendarGrid as _CalendarGrid,
	CalendarGridBody as _CalendarGridBody,
	type CalendarGridBodyProps as _CalendarGridBodyProps,
	CalendarGridHeader as _CalendarGridHeader,
	type CalendarGridHeaderProps as _CalendarGridHeaderProps,
	type CalendarGridProps as _CalendarGridProps,
	CalendarHeaderCell as _CalendarHeaderCell,
	type CalendarHeaderCellProps as _CalendarHeaderCellProps,
	type CalendarProps as _CalendarProps,
	RangeCalendar as _RangeCalendar,
	type RangeCalendarProps as _RangeCalendarProps,
} from "react-aria-components";
import { Button } from "./button";

interface CalendarProps<T extends DateValue> extends _CalendarProps<T> {}

function Calendar<T extends DateValue>({
	className,
	...props
}: CalendarProps<T>) {
	return (
		<_Calendar
			className={(values) =>
				cn(
					"grid w-fit gap-1 text-sm",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

interface RangeCalendarProps<T extends DateValue>
	extends _RangeCalendarProps<T> {}

function RangeCalendar<T extends DateValue>({
	className,
	...props
}: RangeCalendarProps<T>) {
	return (
		<_RangeCalendar
			className={(values) =>
				cn(
					"grid w-fit gap-1 text-sm",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

interface CalendarGridProps extends _CalendarGridProps {}

const CalendarGrid = React.forwardRef<HTMLTableElement, CalendarGridProps>(
	({ className, ...props }, ref) => {
		return (
			<_CalendarGrid
				className={cn(
					"mt-4 w-full border-collapse space-y-1",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
CalendarGrid.displayName = "CalendarGrid";

interface CalendarGridHeaderProps extends _CalendarGridHeaderProps {}

const CalendarGridHeader = React.forwardRef<
	HTMLTableSectionElement,
	CalendarGridHeaderProps
>(({ className, ...props }, ref) => {
	return (
		<_CalendarGridHeader
			className={cn("[&>tr]:flex", className)}
			ref={ref}
			{...props}
		/>
	);
});
CalendarGridHeader.displayName = "CalendarGridHeader";

interface CalendarGridHeaderCellProps extends _CalendarHeaderCellProps {}

const CalendarGridHeaderCell = React.forwardRef<
	HTMLTableCellElement,
	CalendarGridHeaderCellProps
>(({ className, ...props }, ref) => {
	return (
		<_CalendarHeaderCell
			className={cn(
				"w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
CalendarGridHeaderCell.displayName = "CalendarGridHeaderCell";

interface CalendarGridBodyProps extends _CalendarGridBodyProps {}

const CalendarGridBody = React.forwardRef<
	HTMLTableSectionElement,
	CalendarGridBodyProps
>(({ className, ...props }, ref) => {
	return (
		<_CalendarGridBody
			className={cn(
				"[&>tr>td]:p-0 [&>tr]:mt-2 [&>tr]:flex [&>tr]:w-full",
				"[&>tr>td:first-child>div]:rounded-l-md [&>tr>td:last-child>div]:rounded-r-md",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
CalendarGridBody.displayName = "CalendarGridBody";

interface CalendarGridBodyCellProps extends _CalendarCellProps {}

const CalendarGridBodyCell = React.forwardRef<
	HTMLTableCellElement,
	CalendarGridBodyCellProps
>(({ className, date, ...props }, ref) => {
	const isRange = Boolean(React.useContext(RangeCalendarStateContext));

	return (
		<_CalendarCell
			className={(values) =>
				cn(
					"inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-normal ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[hovered]:bg-accent data-[hovered]:text-accent-foreground data-[disabled]:opacity-50 data-[selected]:opacity-100",
					date.compare(today(getLocalTimeZone())) === 0 &&
						"bg-accent text-accent-foreground",
					values.isDisabled && "text-muted-foreground opacity-50",
					values.isFocusVisible &&
						values.isFocused &&
						"outline-none ring-2 ring-ring ring-offset-2",
					values.isSelected &&
						isRange &&
						"rounded-none bg-accent text-accent-foreground",
					((values.isSelected && !isRange) ||
						values.isSelectionStart ||
						values.isSelectionEnd) &&
						"rounded-md bg-primary text-primary-foreground data-[focused]:bg-primary data-[hovered]:bg-primary data-[focused]:text-primary-foreground data-[hovered]:text-primary-foreground",
					values.isOutsideMonth &&
						"text-muted-foreground opacity-50 data-[selected]:bg-accent/50 data-[selected]:text-muted-foreground data-[selected]:opacity-30",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			ref={ref}
			date={date}
			{...props}
		/>
	);
});
CalendarGridBodyCell.displayName = "CalendarGridBodyCell";

function CalendarHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<header
			className={cn(
				"relative flex w-full items-center justify-between pt-1",
				className,
			)}
			{...props}
		/>
	);
}

function CalendarHeading({ className, ...props }: HeadingProps) {
	return (
		<Heading
			slot="title"
			className={cn(
				"text-sm font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

const CalendarPreviousButton = ({
	className,
	variant = "outline",
	iconOnly = false,
	...props
}: React.ComponentProps<typeof Button> & { iconOnly?: boolean }) => (
	<Button
		slot="previous"
		aria-label="Go to previous date range"
		variant={variant}
		size={iconOnly ? "icon" : "default"}
		className={cn("size-7", className)}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		{!iconOnly && <span>Previous</span>}
	</Button>
);
CalendarPreviousButton.displayName = "CalendarPreviousButton";

const CalendarNextButton = ({
	className,
	variant = "outline",
	iconOnly = false,
	...props
}: React.ComponentProps<typeof Button> & { iconOnly?: boolean }) => (
	<Button
		slot="next"
		aria-label="Go to next date range"
		variant={variant}
		size={iconOnly ? "icon" : "default"}
		className={cn("size-7", className)}
		{...props}
	>
		<ChevronRight className="h-4 w-4" />
		{!iconOnly && <span>Next</span>}
	</Button>
);
CalendarNextButton.displayName = "CalendarNextButton";

export {
	Calendar,
	CalendarGrid,
	CalendarGridHeader,
	CalendarGridHeaderCell,
	CalendarGridBody,
	CalendarGridBodyCell,
	CalendarHeader,
	CalendarHeading,
	CalendarPreviousButton,
	CalendarNextButton,
	RangeCalendar,
};
