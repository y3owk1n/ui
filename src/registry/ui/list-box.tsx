"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	Collection,
	Header,
	Section,
	ListBox as _ListBox,
	ListBoxItem as _ListBoxItem,
	type ListBoxItemProps as _ListBoxItemProps,
	type ListBoxProps as _ListBoxProps,
} from "react-aria-components";

interface ListBoxProps<T> extends _ListBoxProps<T> {}

function ListBox<T extends object>({ className, ...props }: ListBoxProps<T>) {
	return (
		<_ListBox
			className={(values) =>
				cn(
					"grid gap-1 text-sm",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

interface ListBoxItemProps extends _ListBoxItemProps {}

const ListBoxItem = React.forwardRef<HTMLDivElement, ListBoxItemProps>(
	({ className, ...props }, ref) => {
		return (
			<_ListBoxItem
				className={(values) =>
					cn(
						"flex w-full cursor-default select-none items-center whitespace-nowrap rounded-md p-2 text-sm font-medium outline-none ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[focus-visible]:bg-accent data-[focus-visible]:text-accent-foreground data-[disabled]:opacity-50 data-[focused]:outline-none group-data-[empty]:hidden",
						"bg-background text-foreground data-[hovered]:bg-primary/10 data-[pressed]:bg-primary/50 data-[selected]:bg-primary data-[selected]:data-[focus-visible]:bg-primary data-[selected]:data-[hovered]:bg-primary data-[selected]:data-[focus-visible]:text-primary-foreground data-[selected]:text-primary-foreground",
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
ListBoxItem.displayName = "ListBoxItem";

const ListBoxSection = Section;

function ListBoxHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<Header
			className={cn(
				"text-md p-2 font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

const ListBoxCollection = Collection;

export {
	ListBox,
	type ListBoxProps,
	ListBoxItem,
	type ListBoxItemProps,
	ListBoxSection,
	ListBoxHeader,
	ListBoxCollection,
};
