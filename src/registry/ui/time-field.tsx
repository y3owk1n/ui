"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
	type TimeValue,
	TimeField as _TimeField,
	type TimeFieldProps as _TimeFieldProps,
} from "react-aria-components";
import { DateInput, DateSegment } from "./date-field";

interface TimeFieldProps<T extends TimeValue> extends _TimeFieldProps<T> {}

function TimeField<T extends TimeValue>({
	className,
	...props
}: TimeFieldProps<T>) {
	return (
		<_TimeField
			className={cn("group flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

const TimeInput = DateInput;

const TimeSegment = DateSegment;

export { TimeField, TimeInput, TimeSegment, type TimeFieldProps };
