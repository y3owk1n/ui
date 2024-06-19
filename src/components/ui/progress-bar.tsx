"use client";

import * as React from "react";

import {
	ProgressBar as _ProgressBar,
	type ProgressBarProps as _ProgressBarProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Label } from "./label";

const ProgressBarLabel = Label;

interface ProgressBarProps extends _ProgressBarProps {}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
	({ className, children, ...props }, ref) => (
		<_ProgressBar
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
		</_ProgressBar>
	),
);
ProgressBar.displayName = "ProgressBar";

const ProgressBarTrack = React.forwardRef<
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
ProgressBarTrack.displayName = "ProgressBarTrack";

const ProgressBarTrackFill = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		percentage?: number;
		isIndeterminate?: boolean;
	}
>(({ className, percentage, isIndeterminate = false, ...props }, ref) => {
	const indeterminateVariants = {
		animate: {
			x: ["-100%", "100%"],
			transition: {
				duration: 1.5,
				repeat: Infinity,
				ease: "linear",
			},
		},
	};

	if (isIndeterminate) {
		return (
			<motion.div
				className={cn(
					"absolute left-0 top-0 h-full w-full bg-primary",
					className,
				)}
				variants={indeterminateVariants}
				animate="animate"
			/>
		);
	}

	return (
		<div
			ref={ref}
			className={cn(
				"h-full w-full flex-1 bg-primary transition-all",
				className,
			)}
			style={{
				transform: `translateX(-${100 - (percentage ?? 0)}%)`,
			}}
			{...props}
		/>
	);
});
ProgressBarTrackFill.displayName = "ProgressBarTrackFill";

export {
	ProgressBar,
	type ProgressBarProps,
	ProgressBarLabel,
	ProgressBarTrack,
	ProgressBarTrackFill,
};
