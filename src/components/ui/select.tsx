"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import {
	Collection,
	Header,
	Section,
	Select as _Select,
	SelectValue as _SelectValue,
	type SelectValueProps as _SelectValueProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "./button";
import {
	ListBox,
	ListBoxItem,
	type ListBoxItemProps,
	type ListBoxProps,
} from "./list-box";
import { Popover, type PopoverProps } from "./popover";
import { Separator, type SeparatorProps } from "./separator";

const Select = _Select;

const SelectSection = Section;

const SelectCollection = Collection;

function SelectValue<T extends object>({
	className,
	...props
}: _SelectValueProps<T>) {
	return (
		<_SelectValue
			className={(values) =>
				cn(
					"data-[placeholder]:text-muted-foreground [&>svg]:hidden",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant = "outline", ...props }, ref) => {
		return (
			<Button
				className={(values) =>
					cn(
						"justify-between",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				variant={variant}
				ref={ref}
				{...props}
			>
				{(values) => (
					<>
						{typeof children === "function"
							? children(values)
							: children}
						<ChevronsUpDown
							aria-hidden="true"
							className="h-4 w-4 opacity-50"
						/>
					</>
				)}
			</Button>
		);
	},
);
SelectTrigger.displayName = "SelectTrigger";

const SelectHeader = ({
	className,
	...props
}: React.ComponentProps<typeof Header>) => (
	<Header
		className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
		{...props}
	/>
);

const SelectItem = React.forwardRef<HTMLDivElement, ListBoxItemProps>(
	({ className, children, ...props }, ref) => {
		return (
			<ListBoxItem
				className={(values) =>
					cn(
						"flex gap-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			>
				{(values) => (
					<>
						<Check
							className={cn(
								"h-4 w-4",
								values.isSelected ? "opacity-100" : "opacity-0",
							)}
						/>
						{typeof children === "function"
							? children(values)
							: children}
					</>
				)}
			</ListBoxItem>
		);
	},
);
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<HTMLElement, SeparatorProps>(
	({ className, ...props }, ref) => {
		return (
			<Separator
				className={cn("-mx-1 my-1 h-px bg-muted", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
SelectSeparator.displayName = Separator.displayName;

function SelectContent<T extends object>({
	className,
	...props
}: ListBoxProps<T>) {
	return (
		<ListBox
			className={(values) =>
				cn(
					"p-1",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

const SelectPopover = React.forwardRef<HTMLElement, PopoverProps>(
	({ className, offset = 4, ...props }, ref) => {
		return (
			<Popover
				ref={ref}
				offset={offset}
				className={(values) =>
					cn(
						"relative z-50 w-[--trigger-width] min-w-[8rem] p-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				{...props}
			/>
		);
	},
);
SelectPopover.displayName = Popover.displayName;

export {
	Select,
	SelectSection,
	SelectValue,
	SelectContent,
	SelectTrigger,
	SelectHeader,
	SelectItem,
	SelectSeparator,
	SelectPopover,
	SelectCollection,
};
