"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	Separator as _Separator,
	type SeparatorProps as _SeparatorProps,
} from "react-aria-components";

export interface SeparatorProps extends _SeparatorProps {}

const Separator = React.forwardRef<HTMLElement, SeparatorProps>(
	({ className, orientation = "horizontal", ...props }, ref) => {
		return (
			<_Separator
				orientation={orientation}
				className={cn(
					"shrink-0 bg-border",
					orientation === "horizontal"
						? "h-[1px] w-full"
						: "h-full w-[1px]",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Separator.displayName = _Separator.name;

export { Separator };
