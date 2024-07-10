"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import { Text, type TextProps } from "react-aria-components";

interface FieldDescriptionProps extends TextProps {}

const FieldDescription = React.forwardRef<HTMLElement, FieldDescriptionProps>(
	({ className, ...props }, ref) => {
		return (
			<Text
				slot="description"
				className={cn("text-sm text-muted-foreground", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
FieldDescription.displayName = "FieldError";

export { FieldDescription, type FieldDescriptionProps };
