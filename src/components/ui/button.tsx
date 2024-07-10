"use client";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import {
	type PressEvent,
	Button as _Button,
	type ButtonProps as _ButtonProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { baseVariant, linkVariant, unstyledVariant } from "@/lib/variants";
import { Loader } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[focused]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2 group-data-[empty]:hidden",
	{
		variants: {
			variant: {
				...baseVariant,
				...linkVariant,
				...unstyledVariant,
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				xs: "rounded-md px-2 py-1",
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

interface ButtonProps
	extends _ButtonProps,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
	/**
	 * @deprecated
	 * Do not use this, this is a temporary compatibility hack. Use onPress instead!
	 */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			isLoading = false,
			isDisabled = false,
			variant,
			size,
			children,
			onClick,
			onPress,
			...props
		},
		ref,
	) => {
		// TODO: This can be deleted once radix UI is not needed
		// A hack to temporarily pass onClick to onPress
		// This is mainly used for radix UI trigger as child compatibility
		// Some components are not available in react-aria-components,
		// so I still need to use radix UI for them
		function handlePress(e: PressEvent) {
			if (onClick && e.target instanceof HTMLButtonElement) {
				const event =
					e as unknown as React.MouseEvent<HTMLButtonElement>;
				// Create a synthetic event
				const syntheticEvent = new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				}) as unknown as React.MouseEvent<HTMLButtonElement>;

				// Copy over properties from the original event
				Object.defineProperty(syntheticEvent, "target", {
					value: event.target,
				});
				Object.defineProperty(syntheticEvent, "currentTarget", {
					value: event.currentTarget,
				});

				// Call onClick with the synthetic event
				onClick(syntheticEvent);
			}

			if (onPress) {
				onPress(e);
			}
		}

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
				isDisabled={isLoading || isDisabled}
				onPress={handlePress}
				{...props}
			>
				{(values) => (
					<>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{typeof children === "function"
							? children(values)
							: children}
					</>
				)}
			</_Button>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
