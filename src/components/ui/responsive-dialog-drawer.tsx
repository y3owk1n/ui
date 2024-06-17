"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button, type buttonVariants } from "../ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import {
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerTitle,
	DrawerTrigger,
} from "./drawer";

interface BaseProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

// Props interface when buttonEl exists
interface WithButtonElProps extends BaseProps {
	buttonEl: React.ReactNode;
}

// Props interface when buttonEl does not exist
interface WithoutButtonElProps extends BaseProps {
	buttonStyle?: VariantProps<typeof buttonVariants>["variant"];
	buttonSize?: VariantProps<typeof buttonVariants>["size"];
	buttonClassNames?: string;
	buttonText: string;
}

// Main props interface with conditional typing
type ResponsiveDialogDrawerProps = WithButtonElProps | WithoutButtonElProps;

export function ResponsiveDialogDrawer({
	title,
	description,
	children,
	...props
}: ResponsiveDialogDrawerProps): JSX.Element {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const hasButtonEl = "buttonEl" in props;

	let triggerButton: React.ReactNode;

	if (hasButtonEl) {
		triggerButton = props.buttonEl;
	} else {
		triggerButton = (
			<Button
				variant={props.buttonStyle ?? "default"}
				size={props.buttonSize ?? "default"}
				className={cn(props.buttonClassNames)}
			>
				{props.buttonText}
			</Button>
		);
	}

	if (isDesktop) {
		return (
			<DialogTrigger onOpenChange={setOpen} isOpen={open}>
				{triggerButton}

				<DialogOverlay>
					<DialogContent role="alertdialog">
						{({ close }) => (
							<>
								<DialogHeader>
									<DialogTitle>{title}</DialogTitle>
								</DialogHeader>

								{description ? (
									<DialogDescription>
										{description}
									</DialogDescription>
								) : null}
								{children}
								<DialogFooter>
									<Button
										variant="outline"
										autoFocus
										onPress={close}
										className="mt-2 sm:mt-0"
									>
										Cancel
									</Button>
								</DialogFooter>
							</>
						)}
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
		);
	}

	return (
		<DrawerTrigger onOpenChange={setOpen} isOpen={open}>
			{triggerButton}

			<DrawerOverlay>
				<DrawerContent>
					{({ close }) => (
						<>
							<DrawerHeader className="text-left">
								<DrawerTitle>{title}</DrawerTitle>
								{description ? (
									<DrawerDescription>
										{description}
									</DrawerDescription>
								) : null}
							</DrawerHeader>

							{children}
							<DrawerFooter>
								<Button
									variant="outline"
									autoFocus
									onPress={close}
									className="mt-2 sm:mt-0"
								>
									Cancel
								</Button>
							</DrawerFooter>
						</>
					)}
				</DrawerContent>
			</DrawerOverlay>
		</DrawerTrigger>
	);
}
