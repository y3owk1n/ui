"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	ColorField as _ColorField,
	type ColorFieldProps as _ColorFieldProps,
} from "react-aria-components";

interface ColorFieldProps extends _ColorFieldProps {}

const ColorField = React.forwardRef<HTMLInputElement, ColorFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_ColorField
				className={cn("group flex flex-col gap-2", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
ColorField.displayName = "ColorField";

export { ColorField, type ColorFieldProps };
