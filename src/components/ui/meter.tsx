"use client";

import * as React from "react";

import {
	Meter as _Meter,
	type MeterProps as _MeterProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const MeterLabel = Label;

interface MeterProps extends _MeterProps {}

const Meter = React.forwardRef<HTMLDivElement, MeterProps>(
	({ className, children, ...props }, ref) => (
		<_Meter
			ref={ref}
			className={(values) =>
				cn(
					"w-full",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) =>
				typeof children === "function" ? children(values) : children
			}
		</_Meter>
	),
);
Meter.displayName = "Meter";

const MeterTrack = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
});
MeterTrack.displayName = "MeterTrack";

const MeterTrackFill = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		percentage: number;
	}
>(({ className, percentage, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"h-full w-full flex-1 bg-primary transition-all",
				className,
			)}
			style={{
				transform: `translateX(-${100 - (percentage || 0)}%)`,
			}}
			{...props}
		/>
	);
});
MeterTrackFill.displayName = "MeterTrackFill";

export { Meter, type MeterProps, MeterLabel, MeterTrack, MeterTrackFill };
