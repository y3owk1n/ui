"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	Input as _Input,
	type InputProps as _InputProps,
} from "react-aria-components";

interface InputProps extends _InputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<_Input
				type={type}
				className={(values) =>
					cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
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
Input.displayName = "Input";

export { Input, type InputProps };
