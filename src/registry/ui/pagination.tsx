"use client";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from "lucide-react";
import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
	type UsePaginationParams,
	type UsePaginationResult,
	usePagination,
} from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";

interface PaginationContextType extends UsePaginationResult {}

const PaginationContext = React.createContext<
	PaginationContextType | undefined
>(undefined);

const Pagination = ({
	className,
	initialPage,
	page,
	total,
	siblings,
	boundaries,
	onChange,
	children,
	...props
}: Omit<React.ComponentProps<"nav">, "onChange" | "children"> &
	Omit<UsePaginationParams, "initialPage"> & {
		initialPage: string | null | number;
		children:
			| ((pagination: PaginationContextType) => JSX.Element)
			| JSX.Element;
	}) => {
	const pagination = usePagination({
		initialPage: !isNaN(Number(initialPage)) ? Number(initialPage) : 1,
		page,
		total,
		siblings,
		boundaries,
		onChange,
	});

	return (
		<PaginationContext.Provider value={pagination}>
			<nav
				role="navigation"
				aria-label="pagination"
				className={cn("mx-auto flex w-full justify-center", className)}
				{...props}
			>
				{typeof children === "function"
					? children(pagination)
					: children}
			</nav>
		</PaginationContext.Provider>
	);
};
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn("flex flex-row items-center gap-1", className)}
		{...props}
	/>
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & ButtonProps;

const PaginationLink = ({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) => (
	<Button
		aria-current={isActive ? "page" : undefined}
		variant={isActive ? "outline" : "ghost"}
		size={size}
		className={cn(className)}
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
	className,
	iconOnly = false,
	...props
}: React.ComponentProps<typeof PaginationLink> & { iconOnly?: boolean }) => (
	<PaginationLink
		aria-label="Go to previous page"
		size={iconOnly ? "icon" : "default"}
		className={cn("gap-1", className)}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		{!iconOnly && <span>Previous</span>}
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationFirst = ({
	className,
	iconOnly = false,
	...props
}: React.ComponentProps<typeof PaginationLink> & { iconOnly?: boolean }) => (
	<PaginationLink
		aria-label="Go to first page"
		size={iconOnly ? "icon" : "default"}
		className={cn("gap-1", className)}
		{...props}
	>
		<ChevronsLeft className="h-4 w-4" />
		{!iconOnly && <span>First</span>}
	</PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationNext = ({
	className,
	iconOnly = false,
	...props
}: React.ComponentProps<typeof PaginationLink> & { iconOnly?: boolean }) => (
	<PaginationLink
		aria-label="Go to next page"
		size={iconOnly ? "icon" : "default"}
		className={cn("gap-1", className)}
		{...props}
	>
		{!iconOnly && <span>Next</span>}
		<ChevronRight className="h-4 w-4" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationLast = ({
	className,
	iconOnly = false,
	...props
}: React.ComponentProps<typeof PaginationLink> & { iconOnly?: boolean }) => (
	<PaginationLink
		aria-label="Go to last page"
		size={iconOnly ? "icon" : "default"}
		className={cn("gap-1", className)}
		{...props}
	>
		{!iconOnly && <span>First</span>}
		<ChevronsRight className="h-4 w-4" />
	</PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationText = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn("px-2 text-sm [&_p]:leading-relaxed", className)}
		{...props}
	/>
));
PaginationText.displayName = "PaginationText";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationFirst,
	PaginationNext,
	PaginationPrevious,
	PaginationLast,
	PaginationText,
};
