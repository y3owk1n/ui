"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
	ColorArea as _ColorArea,
	type ColorAreaProps as _ColorAreaProps,
	ColorSlider as _ColorSlider,
	type ColorSliderProps as _ColorSliderProps,
	ColorSwatch as _ColorSwatch,
	type ColorSwatchProps as _ColorSwatchProps,
	ColorThumb as _ColorThumb,
	type ColorThumbProps as _ColorThumbProps,
	ColorWheel as _ColorWheel,
	type ColorWheelProps as _ColorWheelProps,
	ColorWheelTrack as _ColorWheelTrack,
	type ColorWheelTrackProps as _ColorWheelTrackProps,
	SliderTrack as _SliderTrack,
	type SliderTrackProps as _SliderTrackProps,
	parseColor as _parseColor,
} from "react-aria-components";
import { SliderOutput } from "./slider";

// -------------------------- Color Area --------------------------

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

// -------------------------- Color Slider --------------------------

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
		<ColorThumb
			className={(values) =>
				cn(
					"top-1/2",
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

// -------------------------- Color Swatch --------------------------

interface ColorSwatchProps extends _ColorSwatchProps {}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
	({ className, ...props }, ref) => {
		return (
			<_ColorSwatch
				className={(values) =>
					cn(
						"size-10 rounded-md",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				style={({ color }) => ({
					background: `linear-gradient(${color.toString()}, ${color.toString()}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
				})}
				ref={ref}
				{...props}
			/>
		);
	},
);
ColorSwatch.displayName = "ColorSwatch";

// -------------------------- Color Wheel --------------------------

interface ColorWheelProps
	extends Omit<_ColorWheelProps, "outerRadius" | "innerRadius"> {
	outerRadius?: number;
	innerRadius?: number;
}

const ColorWheel = React.forwardRef<HTMLDivElement, ColorWheelProps>(
	({ className, outerRadius = 100, innerRadius = 74, ...props }, ref) => {
		return (
			<_ColorWheel
				outerRadius={outerRadius}
				innerRadius={innerRadius}
				className={(values) =>
					cn(
						"",
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
ColorWheel.displayName = "ColorWheel";

interface ColorWheelTrackProps extends _ColorWheelTrackProps {}

const ColorWheelTrack = React.forwardRef<HTMLDivElement, ColorWheelTrackProps>(
	({ className, ...props }, ref) => {
		return (
			<_ColorWheelTrack
				className={(values) =>
					cn(
						"",
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
ColorWheelTrack.displayName = "ColorWheelTrack";

// -------------------------- Color Utility --------------------------

const parseColor = _parseColor;

export {
	ColorArea,
	ColorThumb,
	ColorSlider,
	ColorSliderTrack,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSwatch,
	ColorWheel,
	ColorWheelTrack,
	parseColor,
};
