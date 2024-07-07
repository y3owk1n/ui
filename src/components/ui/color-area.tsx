"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	ColorArea as _ColorArea,
	type ColorAreaProps as _ColorAreaProps,
	ColorThumb as _ColorThumb,
	type ColorThumbProps as _ColorThumbProps,
	parseColor as _parseColor,
} from "react-aria-components";

interface ColorAreaProps extends _ColorAreaProps {}

const ColorArea = React.forwardRef<HTMLDivElement, ColorAreaProps>(
	({ className, ...props }, ref) => {
		return (
			<_ColorArea
				className={(values) =>
					cn(
						"size-32 rounded-md",
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
ColorArea.displayName = "ColorArea";

interface ColorThumbProps extends _ColorThumbProps {}

const ColorThumb = React.forwardRef<HTMLDivElement, ColorThumbProps>(
	({ className, ...props }, ref) => {
		return (
			<_ColorThumb
				className={(values) =>
					cn(
						"size-6 rounded-full border-2 shadow-md",
						(values.isFocused || values.isFocusVisible) &&
							"outline-none ring-2 ring-ring ring-offset-2",
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
ColorThumb.displayName = "ColorThumb";

const parseColor = _parseColor;

export { ColorArea, ColorThumb, parseColor };
