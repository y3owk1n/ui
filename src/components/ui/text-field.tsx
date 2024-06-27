"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	TextField as _TextField,
	type TextFieldProps as _TextFieldProps,
} from "react-aria-components";

interface TextFieldProps extends _TextFieldProps {}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_TextField
				className={cn("group flex flex-col gap-2", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
TextField.displayName = "TextField";

export { TextField, type TextFieldProps };
