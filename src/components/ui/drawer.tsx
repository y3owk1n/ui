import { cn } from "@/lib/utils";
import {
	AnimatePresence,
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import {
	Dialog,
	Modal,
	ModalOverlay,
	OverlayTriggerStateContext,
	Dialog as _Dialog,
	type DialogProps as _DialogProps,
	DialogTrigger as _DialogTrigger,
	useContextProps,
} from "react-aria-components";
import { Button } from "./button";
import { DialogFooter, DialogHeader, DialogTitle } from "./dialog";

// Wrap React Aria modal components so they support framer-motion values.
const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

const inertiaTransition = {
	type: "inertia" as const,
	bounceStiffness: 300,
	bounceDamping: 40,
	timeConstant: 300,
};

const staticTransition = {
	duration: 0.5,
	ease: [0.32, 0.72, 0, 1],
};

const SHEET_MARGIN = 34;
const SHEET_RADIUS = 12;

const Drawer = _Dialog;

const DrawerTrigger = _DialogTrigger;

const DrawerOverlay = React.forwardRef<
	React.ElementRef<typeof MotionModalOverlay>,
	React.ComponentPropsWithoutRef<typeof MotionModalOverlay>
>(({ className, ...props }, ref) => {
	const state = useContext(OverlayTriggerStateContext);

	return (
		<AnimatePresence>
			{state.isOpen && (
				<MotionModalOverlay
					isOpen={state.isOpen}
					onOpenChange={(e) => {
						state.setOpen(e);
					}}
					className={(values) =>
						cn(
							"fixed inset-0 z-10",
							typeof className === "function"
								? className(values)
								: className,
						)
					}
					ref={ref}
					{...props}
				/>
			)}
		</AnimatePresence>
	);
});
DrawerOverlay.displayName = MotionModalOverlay.name;

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof MotionModal>,
	Omit<React.ComponentPropsWithoutRef<typeof MotionModal>, "children"> & {
		children?: _DialogProps["children"];
		closeButton?: boolean;
	}
>(({ className, children, closeButton = true, ...props }, ref) => {
	const drawerContentRef = React.useRef<HTMLElement>(null);
	const state = useContext(OverlayTriggerStateContext);

	const h = window.innerHeight - SHEET_MARGIN;

	const y = useMotionValue(h);

	// Scale the body down and adjust the border radius when the sheet is open.
	const bodyScale = useTransform(
		y,
		[0, h],
		[(window.innerWidth - SHEET_MARGIN) / window.innerWidth, 1],
	);
	const bodyTranslate = useTransform(
		y,
		[0, h],
		[SHEET_MARGIN - SHEET_RADIUS, 0],
	);
	const bodyBorderRadius = useTransform(y, [0, h], [SHEET_RADIUS, 0]);

	const bgOpacity = useTransform(y, [0, h], [0.8, 0]);

	useMotionValueEvent(bgOpacity, "change", (v) => {
		if (
			drawerContentRef.current &&
			drawerContentRef.current.parentElement
		) {
			drawerContentRef.current.parentElement.style.backgroundColor = `rgba(0, 0, 0, ${v})`;
		}
	});

	useMotionValueEvent(
		bodyScale,
		"change",
		(v) =>
			((document.querySelector("body > div") as HTMLElement).style.scale =
				`${v}`),
	);
	useMotionValueEvent(
		bodyTranslate,
		"change",
		(v) =>
			((
				document.querySelector("body > div") as HTMLElement
			).style.translate = `0 ${v}px`),
	);
	useMotionValueEvent(
		bodyBorderRadius,
		"change",
		(v) =>
			((
				document.querySelector("body > div") as HTMLElement
			).style.borderRadius = `${v}px`),
	);

	return (
		<MotionModal
			ref={drawerContentRef}
			className={cn(
				"absolute bottom-0 w-full rounded-t-xl bg-background shadow-lg will-change-transform",
				className,
			)}
			initial={{ y: h }}
			animate={{ y: 0 }}
			exit={{ y: h }}
			transition={staticTransition}
			style={{
				y,
				top: SHEET_MARGIN,
				// Extra padding at the bottom to account for rubber band scrolling.
				paddingBottom: window.screen.height,
			}}
			drag="y"
			dragConstraints={{ top: 0 }}
			onDragEnd={async (e, { offset, velocity }) => {
				if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
					state.close();
				} else {
					await animate(y, 0, {
						...inertiaTransition,
						min: 0,
						max: 0,
					});
				}
			}}
			{...props}
		>
			{/* drag affordance */}
			<div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-400" />
			<Dialog className="px-4 pb-4 outline-none">
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
		</MotionModal>
	);
});

DrawerContent.displayName = MotionModal.name;

const DrawerTitle = DialogTitle;
const DrawerHeader = DialogHeader;
const DrawerFooter = DialogFooter;

export {
	Drawer,
	DrawerTrigger,
	DrawerOverlay,
	DrawerContent,
	DrawerTitle,
	DrawerHeader,
	DrawerFooter,
};
