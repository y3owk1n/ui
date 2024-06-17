"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import {
	Heading,
	type HeadingProps,
	Modal,
	ModalOverlay,
	type ModalOverlayProps,
	Dialog as _Dialog,
	type DialogProps as _DialogProps,
	DialogTrigger as _DialogTrigger,
} from "react-aria-components";
import { Button } from "./button";

const Dialog = _Dialog;

const DialogTrigger = _DialogTrigger;

const DialogOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
	({ className, isDismissable = true, ...props }, ref) => {
		return (
			<ModalOverlay
				className={(values) =>
					cn(
						"fixed inset-0 z-50 bg-black/80 data-[exiting]:duration-300 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				isDismissable={isDismissable}
				{...props}
			/>
		);
	},
);
DialogOverlay.displayName = ModalOverlay.name;

const sheetVariants = cva(
	"fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[entering]:duration-500 data-[exiting]:duration-300 data-[entering]:animate-in data-[exiting]:animate-out",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[entering]:slide-in-from-top data-[exiting]:slide-out-to-top",
				bottom: "inset-x-0 bottom-0 border-t data-[entering]:slide-in-from-bottom data-[exiting]:slide-out-to-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[entering]:slide-in-from-left data-[exiting]:slide-out-to-left sm:max-w-sm",
				right: "inset-y-0 right-0 h-full w-3/4 border-l data-[entering]:slide-in-from-right data-[exiting]:slide-out-to-right sm:max-w-sm",
			},
		},
	},
);

export interface DialogContentProps
	extends Omit<ModalOverlayProps, "children">,
		VariantProps<typeof sheetVariants> {
	children?: _DialogProps["children"];
	role?: _DialogProps["role"];
	closeButton?: boolean;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
	({ className, children, closeButton = true, ...props }, ref) => {
		return (
			<Modal
				className={cn(
					!props.side &&
						"fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg duration-200 data-[exiting]:duration-300 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[entering]:slide-in-from-left-1/2 data-[entering]:slide-in-from-top-[48%] data-[exiting]:slide-out-to-left-1/2 data-[exiting]:slide-out-to-top-[48%] sm:rounded-lg md:w-full",
					props.side && sheetVariants({ side: props.side }),
					props.side && "h-full p-4",
					className,
				)}
				ref={ref}
				{...props}
			>
				<Dialog
					role={props.role}
					className={cn(
						!props.side && "grid h-full gap-4",
						"h-full max-h-[calc(100vh-10rem)] overflow-y-auto outline-none",
					)}
				>
					{(values) => (
						<>
							{typeof children === "function"
								? children(values)
								: children}
							{closeButton && (
								<Button
									onPress={values.close}
									variant="unstyled"
									size="unstyled"
									className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[entering]:bg-accent data-[entering]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
								>
									<X className="h-4 w-4" />
									<span className="sr-only">Close</span>
								</Button>
							)}
						</>
					)}
				</Dialog>
			</Modal>
		);
	},
);
DialogContent.displayName = Modal.name;

function DialogHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 text-left", className)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({ className, ...props }: HeadingProps) {
	return (
		<Heading
			slot="title"
			className={cn(
				"text-lg font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	DialogOverlay,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
	Dialog,
};
