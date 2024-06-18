"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Grip } from "lucide-react";
import {
	GridList as _GridList,
	GridListItem as _GridListItem,
	type GridListItemProps as _GridListItemProps,
	type GridListProps as _GridListProps,
} from "react-aria-components";
import { Button } from "./button";
import { Card } from "./card";
import { Checkbox } from "./checkbox";

function GridList<T extends object>({
	className,
	...props
}: _GridListProps<T>) {
	return (
		<Card className={cn("p-2 text-sm", className)}>
			<_GridList {...props} />
		</Card>
	);
}

export interface GridListItemProps extends _GridListItemProps {}

const GridListItem = React.forwardRef<HTMLDivElement, GridListItemProps>(
	({ className, children, ...props }, ref) => {
		const textValue = typeof children === "string" ? children : undefined;

		return (
			<_GridListItem
				textValue={textValue}
				className={(values) =>
					cn(
						"react-aria-GridListItem", // join selected items if :has selector is supported, refer to css file
						"flex w-full items-center whitespace-nowrap rounded-md p-2 text-sm font-medium ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[focused]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2 group-data-[empty]:hidden",
						"bg-background text-foreground data-[pressed]:bg-primary/50 data-[selected]:bg-primary data-[selected]:text-primary-foreground",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			>
				{({ selectionMode, selectionBehavior, allowsDragging }) => (
					<>
						{/* Add elements for drag and drop and selection. */}
						{allowsDragging && (
							<Button slot="drag">
								<Grip className="size-4" />
							</Button>
						)}
						{selectionMode === "multiple" &&
							selectionBehavior === "toggle" && (
								<Checkbox slot="selection" />
							)}
						{children}
					</>
				)}
			</_GridListItem>
		);
	},
);
GridListItem.displayName = _GridListItem.name;

export { GridList, GridListItem };
