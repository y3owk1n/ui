"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Check, Circle } from "lucide-react";
import {
	Collection,
	Header,
	Section,
	Menu as _Menu,
	MenuItem as _MenuItem,
	type MenuItemProps as _MenuItemProps,
	type MenuProps as _MenuProps,
	MenuTrigger as _MenuTrigger,
	SubmenuTrigger as _SubmenuTrigger,
} from "react-aria-components";
import { Keyboard, type KeyboardProps } from "./keyboard";
import { Popover, type PopoverProps } from "./popover";
import { Separator, type SeparatorProps } from "./separator";

const MenuTrigger = _MenuTrigger;

const SubmenuTrigger = _SubmenuTrigger;

const MenuSection = Section;

const MenuCollection = Collection;

const MenuPopover = React.forwardRef<HTMLElement, PopoverProps>(
	({ className, offset = 4, ...props }, ref) => {
		return (
			<Popover
				ref={ref}
				offset={offset}
				className={(values) =>
					cn(
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
MenuPopover.displayName = "MenuPopover";

interface MenuProps<T> extends _MenuProps<T> {}

function Menu<T extends object>({ className, ...props }: MenuProps<T>) {
	return (
		<_Menu
			className={cn(
				"max-h-[inherit] overflow-auto rounded-md border p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]",
				className,
			)}
			{...props}
		/>
	);
}

interface MenuItemProps extends _MenuItemProps {
	offset?: boolean;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
	({ className, offset, ...props }, ref) => {
		return (
			<_MenuItem
				className={(values) =>
					cn(
						"relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50",
						offset && "pl-8",
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
MenuItem.displayName = "MenuItem";

const MenuHeader = ({
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

const MenuSeparator = React.forwardRef<HTMLElement, SeparatorProps>(
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
MenuSeparator.displayName = "MenuSeparator";

const MenuKeyboard = React.forwardRef<HTMLElement, KeyboardProps>(
	({ className, ...props }, ref) => {
		return (
			<Keyboard
				className={cn("-mx-1 my-1", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
MenuKeyboard.displayName = "MenuKeyboard";

const MenuItemCheckbox = React.forwardRef<
	HTMLDivElement,
	Omit<MenuItemProps, "offset">
>(({ className, children, ...props }, ref) => {
	return (
		<_MenuItem
			ref={ref}
			className={(values) =>
				cn(
					"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) => (
				<>
					<span className="absolute left-2 flex h-4 w-4 items-center justify-center">
						{values.isSelected && <Check className="h-4 w-4" />}
					</span>

					{typeof children === "function"
						? children(values)
						: children}
				</>
			)}
		</_MenuItem>
	);
});
MenuItemCheckbox.displayName = "MenuItemCheckbox";

const MenuItemRadio = React.forwardRef<
	HTMLDivElement,
	Omit<MenuItemProps, "offset">
>(({ className, children, ...props }, ref) => {
	return (
		<_MenuItem
			ref={ref}
			className={(values) =>
				cn(
					"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) => (
				<>
					<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
						{values.isSelected && (
							<Circle className="h-2 w-2 fill-current" />
						)}
					</span>
					{typeof children === "function"
						? children(values)
						: children}
				</>
			)}
		</_MenuItem>
	);
});
MenuItemRadio.displayName = "MenuItemRadio";

export {
	MenuTrigger,
	SubmenuTrigger,
	MenuSection,
	MenuCollection,
	MenuPopover,
	type MenuProps,
	Menu,
	type MenuItemProps,
	MenuItem,
	MenuHeader,
	MenuSeparator,
	MenuKeyboard,
	MenuItemCheckbox,
	MenuItemRadio,
};
