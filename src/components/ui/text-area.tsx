"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	TextArea as _TextArea,
	type TextAreaProps as _TextAreaProps,
} from "react-aria-components";

export interface TextAreaProps extends _TextAreaProps {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, ...props }, ref) => {
		return (
			<_TextArea
				className={(values) =>
					cn(
						"flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
TextArea.displayName = TextArea.name;

export { TextArea };
