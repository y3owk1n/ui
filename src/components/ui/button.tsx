"use client";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import {
	Button as _Button,
	type ButtonProps as _ButtonProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[focused]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2 group-data-[empty]:hidden",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground data-[hovered]:bg-primary/90 data-[pressed]:bg-primary/70",
				destructive:
					"bg-destructive text-destructive-foreground data-[hovered]:bg-destructive/90 data-[pressed]:bg-destructive/70",
				outline:
					"border border-input bg-background data-[hovered]:bg-accent data-[pressed]:bg-accent/70 data-[hovered]:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground data-[hovered]:bg-secondary/80 data-[pressed]:bg-secondary/70",
				ghost: "data-[hovered]:bg-accent data-[pressed]:bg-accent/70 data-[hovered]:text-accent-foreground",
				link: "text-primary underline-offset-4 data-[hovered]:underline",
				unstyled: "text-primary data-[hovered]:text-primary/50",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
				unstyled: "h-auto p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends _ButtonProps,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<_Button
				className={(values) =>
					cn(
						buttonVariants({
							variant,
							size,
							className:
								typeof className === "function"
									? className(values)
									: className,
						}),
					)
				}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
