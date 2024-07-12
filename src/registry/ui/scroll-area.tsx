"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { cn } from "@/lib/utils";

interface UseScrollShadowProps {
	deps?: React.DependencyList | undefined;
	orientation?: "horizontal" | "vertical" | "both";
}

function useScrollShadow({
	deps = [],
	orientation = "vertical",
}: UseScrollShadowProps) {
	const containerRef = React.useRef<HTMLDivElement>(null);

	const handleScroll = React.useCallback(() => {
		const container = containerRef.current;
		if (container) {
			const isMostLeft = Math.round(container.scrollLeft) > 0;
			const isMostRight =
				Math.round(container.scrollWidth) >
				Math.round(container.clientWidth) +
					Math.round(container.scrollLeft);
			const isMostTop = Math.round(container.scrollTop) > 0;
			const isMostBottom =
				Math.round(container.scrollHeight) >
				Math.round(container.clientHeight) +
					Math.round(container.scrollTop);

			if (orientation === "horizontal" || orientation === "both") {
				const isMiddleHorizontal = isMostLeft && isMostRight;
				if (isMiddleHorizontal) {
					if (
						container.getAttribute("data-left-right-scroll") !==
						isMiddleHorizontal.toString()
					) {
						container.setAttribute(
							"data-left-right-scroll",
							isMiddleHorizontal.toString(),
						);
						container.removeAttribute("data-left-scroll");
						container.removeAttribute("data-right-scroll");
					}
				} else {
					if (
						container.getAttribute("data-left-scroll") !==
						isMostLeft.toString()
					) {
						container.setAttribute(
							"data-left-scroll",
							isMostLeft.toString(),
						);
					}
					if (
						container.getAttribute("data-right-scroll") !==
						isMostRight.toString()
					) {
						container.setAttribute(
							"data-right-scroll",
							isMostRight.toString(),
						);
					}
					container.removeAttribute("data-left-right-scroll");
				}
			}

			if (orientation === "vertical" || orientation === "both") {
				const isMiddleVertical = isMostTop && isMostBottom;
				if (isMiddleVertical) {
					if (
						container.getAttribute("data-top-bottom-scroll") !==
						isMiddleVertical.toString()
					) {
						container.setAttribute(
							"data-top-bottom-scroll",
							isMiddleVertical.toString(),
						);
						container.removeAttribute("data-top-scroll");
						container.removeAttribute("data-bottom-scroll");
					}
				} else {
					if (
						container.getAttribute("data-top-scroll") !==
						isMostTop.toString()
					) {
						container.setAttribute(
							"data-top-scroll",
							isMostTop.toString(),
						);
					}
					if (
						container.getAttribute("data-bottom-scroll") !==
						isMostBottom.toString()
					) {
						container.setAttribute(
							"data-bottom-scroll",
							isMostBottom.toString(),
						);
					}
					container.removeAttribute("data-top-bottom-scroll");
				}
			}
		}
	}, [orientation]);

	React.useEffect(() => {
		const container = containerRef.current;
		if (container) {
			handleScroll(); // Initial check
			container.addEventListener("scroll", handleScroll);
			return () => {
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, [handleScroll, deps]);

	return containerRef;
}

const ScrollArea = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
		orientation?: "horizontal" | "vertical" | "both";
		showShadow?: boolean;
	}
>(
	(
		{
			className,
			children,
			orientation = "vertical",
			showShadow = false,
			...props
		},
		ref,
	) => {
		const containerRef = useScrollShadow({ orientation });
		return (
			<ScrollAreaPrimitive.Root
				ref={ref}
				className={cn("relative overflow-hidden")}
				{...props}
			>
				<ScrollAreaPrimitive.Viewport
					ref={containerRef}
					className={cn(
						"h-full w-full rounded-[inherit]",
						showShadow &&
							"data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_40px),transparent)] data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_40px),transparent)] data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_40px,#000_calc(100%_-_40px),transparent)]",
						showShadow &&
							"data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_40px),transparent)] data-[top-scroll=true]:[mask-image:linear-gradient(360deg,#000_calc(100%_-_40px),transparent)] data-[top-bottom-scroll=true]:[mask-image:linear-gradient(to_bottom,#000,#000,transparent_0,#000_40px,#000_calc(100%_-_40px),transparent)]",
						className,
					)}
				>
					{children}
				</ScrollAreaPrimitive.Viewport>
				{orientation === "both" ? (
					<>
						<ScrollBar orientation="vertical" />
						<ScrollBar orientation="horizontal" />
					</>
				) : (
					<ScrollBar orientation={orientation} />
				)}
				<ScrollAreaPrimitive.Corner />
			</ScrollAreaPrimitive.Root>
		);
	},
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	React.ComponentPropsWithoutRef<
		typeof ScrollAreaPrimitive.ScrollAreaScrollbar
	>
>(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" &&
				"h-full w-2.5 border-l border-l-transparent p-[1px]",
			orientation === "horizontal" &&
				"h-2.5 flex-col border-t border-t-transparent p-[1px]",
			className,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
