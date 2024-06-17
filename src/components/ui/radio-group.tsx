"use client";

import * as React from "react";
import { Circle } from "lucide-react";

import {
	Radio as _Radio,
	RadioGroup as _RadioGroup,
	type RadioProps as _RadioProps,
	type RadioGroupProps as _RadioGroupProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

// (alias) const _RadioGroup: (props: RadioGroupProps & React.RefAttributes<HTMLDivElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>
// (alias) const _Radio: (props: RadioProps & React.RefAttributes<HTMLLabelElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>

const RadioGroup = React.forwardRef<HTMLDivElement, _RadioGroupProps>(
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
RadioGroup.displayName = _RadioGroup.name;

const RadioGroupItem = React.forwardRef<HTMLLabelElement, _RadioProps>(
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
RadioGroupItem.displayName = _Radio.name;

export { RadioGroup, RadioGroupItem };
