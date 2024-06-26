"use client";

import * as React from "react";

import {
	Label as _Label,
	type LabelProps as _LabelProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

interface LabelProps extends _LabelProps {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => (
		<_Label
			ref={ref}
			className={cn(
				"text-sm font-medium leading-none",
				"group-data-[invalid=true]:text-destructive",
				"group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:opacity-70",
				className,
			)}
			{...props}
		/>
	),
);
Label.displayName = "Label";

export { Label, type LabelProps };
