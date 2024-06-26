"use client";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import * as React from "react";

import { cn } from "@/lib/utils";

import { type DateValue } from "@internationalized/date";
import { Calendar } from "lucide-react";
import {
	type DatePickerRenderProps,
	type DateRangePickerRenderProps,
	Group,
	DatePicker as _DatePicker,
	type DatePickerProps as _DatePickerProps,
	DateRangePicker as _DateRangePicker,
	type DateRangePickerProps as _DateRangePickerProps,
	useLocale,
} from "react-aria-components";
import { Button } from "./button";
import { Dialog } from "./dialog";
import { Popover } from "./popover";

interface DatePickerProps<T extends DateValue> extends _DatePickerProps<T> {}

function DatePicker<T extends DateValue>({
	className,
	...props
}: DatePickerProps<T>) {
	return (
		<_DatePicker
			className={(values) =>
				cn(
					"group flex flex-col gap-2",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

interface DateRangePickerProps<T extends DateValue>
	extends _DateRangePickerProps<T> {}

function DateRangePicker<T extends DateValue>({
	className,
	...props
}: DateRangePickerProps<T>) {
	return (
		<_DateRangePicker
			className={(values) =>
				cn(
					"group flex flex-col gap-2",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

const DatePickerPopover = Popover;

const DatePickerDialog = Dialog;

const DatePickerButton = ({
	className,
	variant = "outline",
	...props
}: React.ComponentProps<typeof Button> & DatePickerRenderProps) => {
	const { locale } = useLocale();

	const date = props.state.value;
	const isInvalid = props.state.isInvalid;

	const formattedDate = React.useMemo(() => {
		if (!date) return "Pick date";

		return new DateFormatter(locale, {
			timeZone: getLocalTimeZone(),
		}).format(date.toDate(getLocalTimeZone()));
	}, [date, locale]);

	return (
		<Group>
			<Button
				variant={variant}
				className={cn(
					"flex gap-2",
					!date && "text-muted-foreground",
					isInvalid &&
						"outline-none ring-2 ring-destructive ring-offset-2",
					className,
				)}
				{...props}
			>
				<Calendar className="h-4 w-4" />
				{formattedDate}
			</Button>
		</Group>
	);
};
DatePickerButton.displayName = "DatePickerButton";

const DateRangePickerButton = ({
	className,
	variant = "outline",
	...props
}: React.ComponentProps<typeof Button> & DateRangePickerRenderProps) => {
	const { locale } = useLocale();

	const date = props.state.value;
	const isInvalid = props.state.isInvalid;

	const formattedDate = React.useMemo(() => {
		if (!date?.end) return "Pick a date range";

		const formattedStart = new DateFormatter(locale, {
			timeZone: getLocalTimeZone(),
		}).format(date.start.toDate(getLocalTimeZone()));

		const formattedEnd = new DateFormatter(locale, {
			timeZone: getLocalTimeZone(),
		}).format(date.end.toDate(getLocalTimeZone()));

		return `${formattedStart} - ${formattedEnd}`;
	}, [date, locale]);

	return (
		<Group>
			<Button
				variant={variant}
				className={cn(
					"flex gap-2",
					!date?.end && "text-muted-foreground",
					isInvalid &&
						"outline-none ring-2 ring-destructive ring-offset-2",
					className,
				)}
				{...props}
			>
				<Calendar className="h-4 w-4" />
				{formattedDate}
			</Button>
		</Group>
	);
};
DateRangePickerButton.displayName = "DateRangePickerButton";

export {
	DatePicker,
	DateRangePicker,
	DatePickerPopover,
	DatePickerDialog,
	DatePickerButton,
	DateRangePickerButton,
};
