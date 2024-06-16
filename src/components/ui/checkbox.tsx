"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";

import {
	Checkbox as _Checkbox,
	type CheckboxProps as _CheckboxProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

type CheckboxProps = _CheckboxProps;

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
	({ className, children, ...props }, ref) => (
		<_Checkbox
			ref={ref}
			className={(values) =>
				cn(
					"group flex items-center gap-x-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) => (
				<>
					<div
						className={cn(
							"h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background group-data-[invalid]:border-destructive group-data-[indeterminate]:bg-primary group-data-[selected]:bg-primary group-data-[selected]:group-data-[invalid]:bg-destructive group-data-[indeterminate]:text-primary-foreground group-data-[selected]:group-data-[invalid]:text-destructive-foreground group-data-[selected]:text-primary-foreground group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2",
						)}
					>
						<div className="flex h-full w-full items-center justify-center text-current">
							{values.isIndeterminate && !values.isSelected && (
								<Minus className="h-4 w-4" />
							)}
							{values.isSelected && <Check className="h-4 w-4" />}
						</div>
					</div>
					{typeof children === "function"
						? children(values)
						: children}
				</>
			)}
		</_Checkbox>
	),
);
Checkbox.displayName = _Checkbox.name;

export { Checkbox, type CheckboxProps };
