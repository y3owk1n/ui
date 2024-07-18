"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import {
	Group,
	SearchField as _SearchField,
	type SearchFieldProps as _SearchFieldProps,
} from "react-aria-components";
import { Button } from "./button";
import { Input, type InputProps } from "./input";

type SearchFieldProps = _SearchFieldProps;

const SearchField = React.forwardRef<HTMLDivElement, SearchFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_SearchField
				ref={ref}
				className={(values) =>
					cn(
						"group flex flex-col gap-2",
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
SearchField.displayName = "SearchField";

const SearchFieldInput = React.forwardRef<
	HTMLInputElement,
	Omit<InputProps, "type">
>(({ className, ...props }, ref) => {
	return (
		<Group className="relative">
			<div className="absolute left-0 top-0 grid h-full w-10 place-items-center">
				<Search className="size-4 stroke-muted-foreground" />
			</div>
			<Input
				type="search"
				className={(values) =>
					cn(
						"px-10 [&::-webkit-search-cancel-button]:hidden",
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
					<X className="size-4" />
				</Button>
			</div>
		</Group>
	);
});
SearchFieldInput.displayName = "SearchFieldInput";

export { SearchField, type SearchFieldProps, SearchFieldInput };
