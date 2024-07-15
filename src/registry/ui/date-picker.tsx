"use client";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/registry/ui/button";
import { Dialog } from "@/registry/ui/dialog";
import { Popover } from "@/registry/ui/popover";
import { type DateValue } from "@internationalized/date";
import { Calendar } from "lucide-react";
import {
	type DatePickerRenderProps,
	type DateRangePickerRenderProps,
	Group,
	type GroupProps,
	DatePicker as _DatePicker,
	type DatePickerProps as _DatePickerProps,
	DateRangePicker as _DateRangePicker,
	type DateRangePickerProps as _DateRangePickerProps,
	useLocale,
} from "react-aria-components";

type DatePickerProps<T extends DateValue> = _DatePickerProps<T>;

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

type DateRangePickerProps<T extends DateValue> = _DateRangePickerProps<T>;

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
					"flex w-full justify-start gap-2 text-left",
					!date && "text-muted-foreground",
					isInvalid && "border-destructive-foreground outline-none",
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
					"flex w-full justify-start gap-2 text-left",
					!date?.end && "text-muted-foreground",
					isInvalid && "border-destructive-foreground outline-none",
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

interface DatePickerPresetProps extends Omit<GroupProps, "children"> {
	children: React.ReactNode;
}

const DatePickerPreset = ({
	className,
	children,
	...props
}: DatePickerPresetProps) => {
	return (
		<Group
			slot={null}
			className={cn(
				"mt-4 flex w-full min-w-[200px] flex-col gap-2",
				className,
			)}
			{...props}
		>
			<span className="text-sm font-bold">Presets</span>
			{children}
		</Group>
	);
};
DatePickerPreset.displayName = "DatePickerPreset";

const DatePickerPresetButton = ({
	className,
	variant = "outline",
	...props
}: React.ComponentProps<typeof Button>) => {
	return (
		<Button
			slot={null}
			variant={variant}
			className={cn("w-full", className)}
			{...props}
		/>
	);
};
DatePickerPresetButton.displayName = "DatePickerPresetButton";

export {
	DatePicker,
	DateRangePicker,
	DatePickerPopover,
	DatePickerDialog,
	DatePickerButton,
	DateRangePickerButton,
	DatePickerPreset,
	DatePickerPresetButton,
};
