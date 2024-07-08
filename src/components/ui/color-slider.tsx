"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	ColorSlider as _ColorSlider,
	type ColorSliderProps as _ColorSliderProps,
	ColorThumb as _ColorThumb,
	type ColorThumbProps as _ColorThumbProps,
	SliderTrack as _SliderTrack,
	type SliderTrackProps as _SliderTrackProps,
} from "react-aria-components";
import { SliderOutput } from "./slider";

interface ColorSliderProps extends _ColorSliderProps {}

const ColorSlider = React.forwardRef<HTMLDivElement, ColorSliderProps>(
	({ className, ...props }, ref) => {
		return (
			<_ColorSlider
				className={cn("group flex w-full flex-col gap-2", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
ColorSlider.displayName = "ColorSlider";

interface ColorSliderTrackProps extends _SliderTrackProps {}

const ColorSliderTrack = React.forwardRef<
	HTMLDivElement,
	ColorSliderTrackProps
>(({ className, ...props }, ref) => {
	return (
		<_SliderTrack
			className={(values) =>
				cn(
					"relative grow rounded-md",
					values.orientation === "vertical" ? "h-full w-10" : "",
					values.orientation === "horizontal" ? "h-10 w-full" : "",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			ref={ref}
			{...props}
		/>
	);
});
ColorSliderTrack.displayName = "ColorSliderTrack";

const ColorSliderOutput = SliderOutput;

interface ColorSliderThumbProps extends _ColorThumbProps {}

const ColorSliderThumb = React.forwardRef<
	HTMLDivElement,
	ColorSliderThumbProps
>(({ className, ...props }, ref) => {
	return (
		<_ColorThumb
			className={(values) =>
				cn(
					"top-1/2 size-6 rounded-full border-2 shadow-md",
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
});
ColorSliderThumb.displayName = "ColorSliderThumb";

export {
	ColorSlider,
	type ColorSliderProps,
	ColorSliderTrack,
	ColorSliderOutput,
	ColorSliderThumb,
};
