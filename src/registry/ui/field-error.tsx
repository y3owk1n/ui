"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	FieldError as _FieldError,
	type FieldErrorProps as _FieldErrorProps,
} from "react-aria-components";

interface FieldErrorProps extends _FieldErrorProps {}

const FieldError = React.forwardRef<HTMLElement, FieldErrorProps>(
	({ className, ...props }, ref) => {
		return (
			<_FieldError
				className={(values) =>
					cn(
						"text-sm font-medium text-destructive-foreground",
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
FieldError.displayName = "FieldError";

export { FieldError, type FieldErrorProps };
