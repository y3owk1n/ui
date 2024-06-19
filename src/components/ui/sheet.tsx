"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import { type VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import {
	Heading,
	type HeadingProps,
	Modal,
	type ModalOverlayProps,
	DialogTrigger,
} from "react-aria-components";
import { Button } from "./button";
import { Dialog, DialogOverlay, type DialogProps } from "./dialog";

const Sheet = Dialog;

const SheetTrigger = DialogTrigger;

const SheetOverlay = DialogOverlay;

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

interface SheetContentProps
	extends Omit<ModalOverlayProps, "children">,
		VariantProps<typeof sheetVariants> {
	children?: DialogProps["children"];
	closeButton?: boolean;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
	({ className, children, closeButton = true, ...props }, ref) => {
		return (
			<Modal
				className={cn(
					props.side && sheetVariants({ side: props.side }),
					props.side && "h-full",
					className,
				)}
				ref={ref}
				{...props}
			>
				<Sheet
					className={cn(
						"h-full max-h-[calc(100vh-10rem)] overflow-y-auto p-4 outline-none",
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
				</Sheet>
			</Modal>
		);
	},
);
SheetContent.displayName = "SheetContent";

function SheetHeader({
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

function SheetFooter({
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

function SheetTitle({ className, ...props }: HeadingProps) {
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

function SheetDescription({
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
	SheetOverlay,
	SheetTrigger,
	SheetContent,
	type SheetContentProps,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
	Sheet,
};
