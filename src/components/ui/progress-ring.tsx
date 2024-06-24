"use client";

import * as React from "react";

import {
	ProgressBar as _ProgressRing,
	type ProgressBarProps as _ProgressRingProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Label } from "./label";

const ProgressRingLabel = Label;

interface ProgressRingProps extends _ProgressRingProps {}

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
	({ className, children, ...props }, ref) => (
		<_ProgressRing
			ref={ref}
			className={(values) =>
				cn(
					"",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		>
			{(values) => {
				const toRenderChildren =
					typeof children === "function"
						? children(values)
						: children;
				return (
					<div className="flex items-center justify-center">
						{toRenderChildren}
					</div>
				);
			}}
		</_ProgressRing>
	),
);
ProgressRing.displayName = "ProgressRing";

const ProgressRingOuter = React.forwardRef<
	SVGSVGElement,
	React.HTMLAttributes<SVGSVGElement>
>(({ className, ...props }, ref) => {
	return (
		<svg
			ref={ref}
			className={cn("size-72 -rotate-90 transform", className)}
			{...props}
		/>
	);
});
ProgressRingOuter.displayName = "ProgressRingOuter";

const ProgressRingInner = React.forwardRef<
	SVGCircleElement,
	React.HTMLAttributes<SVGCircleElement>
>(({ className, ...props }, ref) => {
	return (
		<circle
			ref={ref}
			className={cn(
				"fill-transparent stroke-current stroke-[30px] text-secondary",
				className,
			)}
			cx="145"
			cy="145"
			r="120"
			{...props}
		/>
	);
});
ProgressRingInner.displayName = "ProgressRingInner";

const ProgressRingInnerFill = React.forwardRef<
	SVGCircleElement,
	React.HTMLAttributes<SVGCircleElement> & {
		percentage?: number;
		isIndeterminate?: boolean;
	}
>(({ className, percentage = 0, isIndeterminate = false, ...props }, ref) => {
	const circumference = ((2 * 22) / 7) * 120;
	const indeterminateVariants = {
		animate: {
			strokeDashoffset: [
				circumference - (-100 / 100) * circumference,
				circumference - (100 / 100) * circumference,
			],
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: "linear",
			},
		},
	};

	if (isIndeterminate) {
		return (
			<motion.circle
				className={cn(
					"fill-transparent stroke-current stroke-[30px] text-primary",
					className,
				)}
				cx="145"
				cy="145"
				r="120"
				variants={indeterminateVariants}
				animate="animate"
				strokeDasharray={circumference}
			/>
		);
	}

	return (
		<circle
			ref={ref}
			className={cn(
				"fill-transparent stroke-current stroke-[30px] text-primary",
				className,
			)}
			cx="145"
			cy="145"
			r="120"
			strokeDasharray={circumference}
			strokeDashoffset={
				circumference - (percentage / 100) * circumference
			}
			{...props}
		/>
	);
});
ProgressRingInnerFill.displayName = "ProgressRingInnerFill";

export {
	ProgressRing,
	type ProgressRingProps,
	ProgressRingLabel,
	ProgressRingOuter,
	ProgressRingInner,
	ProgressRingInnerFill,
};
