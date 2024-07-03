"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface UseScrollShadowProps {
	deps?: React.DependencyList | undefined;
	orientation?: "horizontal" | "vertical";
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

			if (orientation === "horizontal") {
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

			if (orientation === "vertical") {
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

interface ScrollShadowProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
}

function ScrollShadow({ className, orientation, ...props }: ScrollShadowProps) {
	const ref = useScrollShadow({ orientation });

	return (
		<div
			ref={ref}
			className={cn(
				orientation === "vertical" && "overflow-y-auto",
				orientation === "horizontal" && "overflow-x-auto",
				"data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_40px),transparent)] data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_40px),transparent)] data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_40px,#000_calc(100%_-_40px),transparent)]",
				"data-[top-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_40px),transparent)] data-[bottom-scroll=true]:[mask-image:linear-gradient(360deg,#000_calc(100%_-_40px),transparent)] data-[top-bottom-scroll=true]:[mask-image:linear-gradient(to_bottom,#000,#000,transparent_0,#000_40px,#000_calc(100%_-_40px),transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

export { ScrollShadow };
