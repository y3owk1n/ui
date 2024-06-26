"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	type DateValue,
	DateField as _DateField,
	type DateFieldProps as _DateFieldProps,
	DateInput as _DateInput,
	type DateInputProps as _DateInputProps,
	DateSegment as _DateSegment,
	type DateSegmentProps as _DateSegmentProps,
} from "react-aria-components";

interface DateFieldProps<T extends DateValue> extends _DateFieldProps<T> {}

function DateField<T extends DateValue>(props: DateFieldProps<T>) {
	return <_DateField className="group flex flex-col gap-2" {...props} />;
}

interface DateInputProps extends _DateInputProps {}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
	({ className, ...props }, ref) => {
		return (
			<_DateInput
				className={(values) =>
					cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
						values.isDisabled && "cursor-not-allowed opacity-50",
						values.isFocusWithin &&
							"outline-none ring-2 ring-ring ring-offset-2",
						values.isInvalid &&
							"outline-none ring-2 ring-destructive ring-offset-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			/>
		);
	},
);
DateInput.displayName = "DateInput";

interface DateSegmentProps extends _DateSegmentProps {}

const DateSegment = React.forwardRef<HTMLDivElement, DateSegmentProps>(
	({ className, ...props }, ref) => {
		return (
			<_DateSegment
				className={(values) =>
					cn(
						"rounded-md p-px text-center text-foreground",
						values.type === "literal" && "p-0",
						values.isPlaceholder && "italic text-muted-foreground",
						values.isFocused &&
							"bg-primary text-primary-foreground outline-none",
						values.isInvalid && "text-destructive",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			/>
		);
	},
);
DateSegment.displayName = "DateSegment";

export { DateField, DateInput, DateSegment, type DateFieldProps };
