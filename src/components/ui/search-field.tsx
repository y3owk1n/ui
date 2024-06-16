"use client";
import * as React from "react";

import {
	SearchField as _SearchField,
	type SearchFieldProps as _SearchFieldProps,
} from "react-aria-components";
import { Input, type InputProps } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { X } from "lucide-react";

export interface SearchFieldProps extends _SearchFieldProps {}

const SearchField = React.forwardRef<HTMLDivElement, SearchFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_SearchField
				ref={ref}
				className={(values) =>
					cn(
						"group",
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
SearchField.displayName = SearchField.name;

const SearchFieldInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<div className="relative">
				<Input
					className={(values) =>
						cn(
							"pr-10 [&::-webkit-search-cancel-button]:hidden",
							typeof className === "function"
								? className(values)
								: className,
						)
					}
					ref={ref}
					{...props}
				/>

				<Button
					className="absolute right-0 top-0"
					variant="ghost"
					size="icon"
				>
					<X className="size-4" />
				</Button>
			</div>
		);
	},
);
SearchFieldInput.displayName = SearchFieldInput.name;

export { SearchField, SearchFieldInput };
