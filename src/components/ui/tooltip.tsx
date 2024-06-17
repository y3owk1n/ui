"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	Tooltip as _Tooltip,
	type TooltipProps as _TooltipProps,
	TooltipTrigger as _TooltipTrigger,
} from "react-aria-components";

const TooltipTrigger = _TooltipTrigger;

const Tooltip = React.forwardRef<HTMLDivElement, _TooltipProps>(
	({ className, offset = 4, ...props }, ref) => {
		return (
			<_Tooltip
				offset={offset}
				className={(values) =>
					cn(
						"z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2",
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
Tooltip.displayName = _Tooltip.name;

export { Tooltip, TooltipTrigger };
