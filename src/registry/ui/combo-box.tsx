"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import {
	Collection,
	Group,
	Header,
	Section,
	ComboBox as _ComboBox,
	type ComboBoxProps as _ComboBoxProps,
} from "react-aria-components";
import { Button } from "./button";
import { Input, type InputProps } from "./input";
import { Label } from "./label";
import {
	ListBox,
	ListBoxItem,
	type ListBoxItemProps,
	type ListBoxProps,
} from "./list-box";
import { Popover, type PopoverProps } from "./popover";
import { Separator, type SeparatorProps } from "./separator";

interface ComboBoxProps<T extends object> extends _ComboBoxProps<T> {}

function ComboBox<T extends object>({ className, ...props }: ComboBoxProps<T>) {
	return (
		<_ComboBox
			className={cn("group flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

const ComboBoxSection = Section;

const ComboBoxCollection = Collection;

const ComboBoxLabel = Label;

const ComboBoxTrigger = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<Group className="relative">
				<Input
					className={(values) =>
						cn(
							"pr-10",
							typeof className === "function"
								? className(values)
								: className,
						)
					}
					ref={ref}
					{...props}
				/>

				<div className="absolute right-0 top-0 h-10">
					<Button variant="unstyled" size="icon">
						<ChevronsUpDown aria-hidden="true" className="size-4" />
					</Button>
				</div>
			</Group>
		);
	},
);
ComboBoxTrigger.displayName = "ComboBoxTrigger";

const ComboBoxHeader = ({
	className,
	offset = false,
	separator = true,
	...props
}: React.ComponentProps<typeof Header> & {
	separator?: boolean;
	offset?: boolean;
}) => (
	<Header
		className={cn(
			"py-1.5 pr-2 text-sm font-semibold",
			separator &&
				"-mx-1 mb-1 border-b border-b-border px-3 pb-[0.625rem]",
			offset && "pl-8",
			className,
		)}
		{...props}
	/>
);

const ComboBoxItem = React.forwardRef<HTMLDivElement, ListBoxItemProps>(
	({ className, children, ...props }, ref) => {
		return (
			<ListBoxItem
				className={(values) =>
					cn(
						"gap-2",
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
ComboBoxItem.displayName = "ComboBoxItem";

const ComboBoxSeparator = React.forwardRef<HTMLElement, SeparatorProps>(
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
ComboBoxSeparator.displayName = "ComboBoxSeparator";

function ComboBoxContent<T extends object>({
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

const ComboBoxPopover = React.forwardRef<HTMLElement, PopoverProps>(
	({ className, offset = 4, ...props }, ref) => {
		return (
			<Popover
				ref={ref}
				offset={offset}
				className={(values) =>
					cn(
						"relative w-[--trigger-width] min-w-[8rem]",
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
ComboBoxPopover.displayName = "SelectPopover";

export {
	ComboBox,
	type ComboBoxProps,
	ComboBoxLabel,
	ComboBoxContent,
	ComboBoxTrigger,
	ComboBoxHeader,
	ComboBoxItem,
	ComboBoxSeparator,
	ComboBoxPopover,
	ComboBoxSection,
	ComboBoxCollection,
};
