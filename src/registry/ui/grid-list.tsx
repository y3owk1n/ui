"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Grip } from "lucide-react";
import {
	GridListContext,
	GridList as _GridList,
	GridListItem as _GridListItem,
	type GridListItemProps as _GridListItemProps,
	type GridListProps as _GridListProps,
} from "react-aria-components";
import { Button } from "./button";
import { Checkbox } from "./checkbox";

function GridList<T extends object>({
	className,
	...props
}: _GridListProps<T>) {
	return (
		<_GridList
			className={(values) =>
				cn(
					"grid text-sm",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

interface GridListItemProps extends _GridListItemProps {
	highlightSelected?: boolean;
}

const GridListItem = React.forwardRef<HTMLDivElement, GridListItemProps>(
	({ className, children, highlightSelected = false, ...props }, ref) => {
		const textValue = typeof children === "string" ? children : undefined;

		return (
			<_GridListItem
				textValue={textValue}
				className={(values) =>
					cn(
						"flex w-full cursor-pointer items-center whitespace-nowrap rounded-md p-2 text-sm font-medium ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[focused]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2 group-data-[empty]:hidden",
						"bg-background text-foreground data-[hovered]:bg-accent data-[pressed]:bg-accent/50",
						highlightSelected &&
							"react-aria-GridListItem data-[selected]:bg-primary data-[selected]:data-[hovered]:bg-primary data-[selected]:text-primary-foreground",
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
GridListItem.displayName = "GridListItem";

export { GridList, GridListItem, type GridListItemProps };
