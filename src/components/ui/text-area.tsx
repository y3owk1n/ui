"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	TextArea as _TextArea,
	type TextAreaProps as _TextAreaProps,
} from "react-aria-components";

interface TextAreaProps extends _TextAreaProps {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, ...props }, ref) => {
		return (
			<_TextArea
				className={(values) =>
					cn(
						"flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
						values.isDisabled && "cursor-not-allowed opacity-50",
						values.isFocused &&
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
TextArea.displayName = "TextArea";

export { TextArea, type TextAreaProps };
