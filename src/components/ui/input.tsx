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
Input.displayName = "Input";

export { Input, type InputProps };
