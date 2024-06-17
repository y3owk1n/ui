"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	Collection,
	Header,
	Section,
	SectionProps,
	ListBox as _ListBox,
	ListBoxItem as _ListBoxItem,
	type ListBoxItemProps as _ListBoxItemProps,
	type ListBoxProps as _ListBoxProps,
} from "react-aria-components";
import { Card } from "./card";

function ListBox<T extends object>({ className, ...props }: _ListBoxProps<T>) {
	return (
		<Card className={cn("p-2", className)}>
			<_ListBox className="grid gap-1" {...props} />
		</Card>
	);
}

export interface ListBoxItemProps extends _ListBoxItemProps {}

const ListBoxItem = React.forwardRef<HTMLDivElement, ListBoxItemProps>(
	({ className, ...props }, ref) => {
		return (
			<_ListBoxItem
				className={(values) =>
					cn(
						"flex w-full items-center whitespace-nowrap rounded-md p-2 text-sm font-medium ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[focused]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2 group-data-[empty]:hidden",
						"bg-background text-foreground data-[pressed]:bg-primary/50 data-[selected]:bg-primary data-[selected]:text-primary-foreground",
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
ListBoxItem.displayName = _ListBoxItem.name;

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
	ListBoxItem,
	ListBoxSection,
	ListBoxHeader,
	ListBoxCollection,
};
