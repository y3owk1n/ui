"use client";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import {
	Label as _Label,
	type LabelProps as _LabelProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export interface LabelProps
	extends _LabelProps,
		VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => (
		<_Label
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props}
		/>
	),
);
Label.displayName = _Label.name;

export { Label, labelVariants };
