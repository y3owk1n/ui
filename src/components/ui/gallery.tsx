"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import * as React from "react";

function groupStrings<T extends object | string>(
	arr: T[],
	columns: number,
): T[][] {
	const groups = new Map<number, T[]>();

	for (let i = 0; i < columns; i++) {
		groups.set(i, []);
	}

	for (let i = 0; i < arr.length; i++) {
		const currentGroup = groups.get(i % columns);
		const item = arr[i];
		if (item && currentGroup) {
			currentGroup.push(item);
		}
	}

	return Array.from(groups.values());
}

interface UseGalleryOpts {
	responsive?: UseGalleryOptsResponsive;
}

interface UseGalleryOptsResponsive {
	"2xl": number;
	xl: number;
	lg: number;
	md: number;
	sm: number;
}

function useGallery<T extends object | string>(
	images: T[],
	opts?: UseGalleryOpts,
): { data: T[][]; columns: number } {
	const responsive = React.useMemo(() => {
		if (opts?.responsive) {
			return opts.responsive;
		}
		return {
			"2xl": 5,
			xl: 4,
			lg: 3,
			md: 2,
			sm: 1,
		};
	}, [opts?.responsive]);

	const is2xl = useMediaQuery("(min-width: 1536px)");
	const isXl = useMediaQuery("(min-width: 1280px)");
	const isLg = useMediaQuery("(min-width: 1024px)");
	const isMd = useMediaQuery("(min-width: 768px)");
	const isSm = useMediaQuery("(min-width: 640px)");

	const columns = React.useMemo(() => {
		if (responsive["2xl"] && is2xl) return responsive["2xl"];

		if (responsive["xl"] && isXl) return responsive["xl"];

		if (responsive["lg"] && isLg) return responsive["lg"];

		if (responsive["md"] && isMd) return responsive["md"];

		if (responsive["sm"] && isSm) return responsive["sm"];

		return 1;
	}, [is2xl, isLg, isMd, isSm, isXl, responsive]);

	const groups = groupStrings(images, columns);

	return { data: groups, columns };
}

interface GalleryData<T extends object | string> {
	data: T[][];
	columns: number;
}

interface GalleryProps<T extends object | string>
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
	images: T[];
	children: (data: GalleryData<T>) => React.ReactNode;
	opts?: UseGalleryOpts;
}

function Gallery<T extends object | string>({
	className,
	images = [],
	children,
	opts,
	...props
}: GalleryProps<T>) {
	const galleryData = useGallery(images, opts);

	return (
		<div
			className={cn(
				"grid gap-4",
				galleryData.columns === 1 && "grid-cols-1",
				galleryData.columns === 2 && "grid-cols-2",
				galleryData.columns === 3 && "grid-cols-3",
				galleryData.columns === 4 && "grid-cols-4",
				galleryData.columns === 5 && "grid-cols-5",
				className,
			)}
			{...props}
		>
			{children(galleryData)}
		</div>
	);
}

interface GalleryItemProps extends React.HTMLAttributes<HTMLDivElement> {}

function GalleryItem({ className, ...props }: GalleryItemProps) {
	return <div className={cn("block space-y-4", className)} {...props} />;
}

export { Gallery, GalleryItem };
