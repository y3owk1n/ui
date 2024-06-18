"use client";

import { Circle } from "lucide-react";
import * as React from "react";

import {
	Radio as _Radio,
	RadioGroup as _RadioGroup,
	type RadioGroupProps as _RadioGroupProps,
	type RadioProps as _RadioProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

interface RadioGroupProps extends _RadioGroupProps {}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
	({ className, ...props }, ref) => {
		return (
			<_RadioGroup
				className={(values) =>
					cn(
						"grid gap-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				{...props}
				ref={ref}
			/>
		);
	},
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends _RadioProps {}

const RadioGroupItem = React.forwardRef<HTMLLabelElement, RadioGroupItemProps>(
	({ className, children, ...props }, ref) => {
		return (
			<_Radio
				ref={ref}
				className={(values) =>
					cn(
						"group flex items-center gap-x-2 data-[focused]:outline-none",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				{...props}
			>
				{(values) => (
					<>
						<span className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background group-data-[disabled]:opacity-50 group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2">
							<Circle
								className={cn(
									"size-0 fill-current text-current transition-all duration-75",
									values.isSelected ? "size-2.5" : "",
									values.isPressed && !values.isSelected
										? "size-1.5"
										: "",
								)}
							/>
						</span>
						<span className="text-sm">
							{typeof children === "function"
								? children(values)
								: children}
						</span>
					</>
				)}
			</_Radio>
		);
	},
);
RadioGroupItem.displayName = "RadioGroupItem";

export {
	RadioGroup,
	type RadioGroupProps,
	RadioGroupItem,
	type RadioGroupItemProps,
};
