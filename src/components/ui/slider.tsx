"use client";

import * as React from "react";

import {
	Slider as _Slider,
	SliderOutput as _SliderOutput,
	SliderTrack as _SliderTrack,
	SliderThumb as _SliderThumb,
	type SliderProps as _SliderProps,
	type SliderTrackProps as _SliderTrackProps,
	type SliderThumbProps as _SliderThumbProps,
	SliderStateContext,
} from "react-aria-components";

import { cn } from "@/lib/utils";

interface SliderProps extends _SliderProps {}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
	({ className, children, orientation, ...props }, ref) => (
		<_Slider
			ref={ref}
			className={(values) =>
				cn(
					"relative flex touch-none select-none items-center",
					orientation === "vertical" ? "h-full w-2" : "",
					orientation === "horizontal" ? "w-full h-2" : "",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			orientation={orientation}
			{...props}
		>
			{(values) =>
				typeof children === "function" ? children(values) : children
			}
		</_Slider>
	),
);
Slider.displayName = _Slider.name;

const SliderOutput = _SliderOutput;

const SliderTrack = React.forwardRef<HTMLDivElement, _SliderTrackProps>(
	({ className, children, ...props }, ref) => (
		<_SliderTrack
			ref={ref}
			className={(values) =>
				cn(
					"relative grow rounded-full bg-secondary",
					values.orientation === "vertical" ? "h-full w-2" : "",
					values.orientation === "horizontal" ? "w-full h-2" : "",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) => (
				<>
					<SliderTrackFill />
					{typeof children === "function"
						? children(values)
						: children}
				</>
			)}
		</_SliderTrack>
	),
);
SliderTrack.displayName = _SliderTrack.name;

const SliderTrackFill = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const state = React.useContext(SliderStateContext);
	const single = state.values.length <= 1;
	const orientation = state.orientation === "vertical" ? "height" : "width";
	const directionStart = state.orientation === "vertical" ? "bottom" : "left";
	const directionEnd = state.orientation === "vertical" ? "top" : "right";

	return (
		<div
			ref={ref}
			style={
				single
					? { [orientation]: state.getThumbPercent(0) * 100 + "%" }
					: {
							[directionStart]: state.values![0] + "%",
							[directionEnd]: 100 - state.values![1] + "%",
						}
			}
			className={cn(
				"absolute rounded-full bg-primary",
				state.orientation === "vertical" ? "w-2" : "",
				state.orientation === "vertical" && single ? "bottom-0" : "",
				state.orientation === "horizontal" ? "h-2" : "",
				className,
			)}
			{...props}
		/>
	);
});
SliderTrackFill.displayName = "SliderTrackFill";

const SliderThumb = React.forwardRef<HTMLDivElement, _SliderThumbProps>(
	({ className, ...props }, ref) => (
		<_SliderThumb
			ref={ref}
			className={(values) =>
				cn(
					"left-[50%] top-[50%] block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	),
);
SliderThumb.displayName = _SliderThumb.name;

export { Slider, SliderOutput, SliderTrack, SliderTrackFill, SliderThumb };
