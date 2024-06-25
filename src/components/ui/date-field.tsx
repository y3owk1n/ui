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
	return <_DateField {...props} />;
}

interface DateInputProps extends _DateInputProps {}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
	({ className, ...props }, ref) => {
		return (
			<_DateInput
				className={(values) =>
					cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
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
						values.isPlaceholder && "text-muted-foreground",
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
