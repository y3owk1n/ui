"use client";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import {
	ToggleButton as _ToggleButton,
	type ToggleButtonProps as _ToggleButtonProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { baseVariant } from "@/lib/variants";

const toggleButtonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[hovered]:bg-muted data-[selected]:bg-accent data-[hovered]:text-muted-foreground data-[selected]:text-accent-foreground data-[disabled]:opacity-50 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
	{
		variants: {
			variant: baseVariant,
			size: {
				default: "h-10 px-3",
				sm: "h-9 px-2.5",
				lg: "h-11 px-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ToggleButtonProps
	extends _ToggleButtonProps,
		VariantProps<typeof toggleButtonVariants> {}

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
	({ className, variant, size, ...props }, ref) => (
		<_ToggleButton
			ref={ref}
			className={(values) =>
				cn(
					toggleButtonVariants({
						variant,
						size,
						className:
							typeof className === "function"
								? className(values)
								: className,
					}),
				)
			}
			{...props}
		/>
	),
);

ToggleButton.displayName = "ToggleButton";

export { ToggleButton, type ToggleButtonProps, toggleButtonVariants };
