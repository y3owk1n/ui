"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import * as React from "react";

function groupStrings<T extends object | string>(
	arr: T[],
	columns: number,
): T[][] {
	const groups: T[][] = [];

	for (let i = 0; i < columns; i++) {
		groups[i] = [];
	}

	for (let i = 0; i < arr.length; i++) {
		const currentGroup = groups[i % columns];
		const item = arr[i];
		if (item) {
			currentGroup?.push(item);
		}
	}

	return groups;
}

function useGallery<T extends object | string>(
	images: T[],
): { data: T[][]; columns: number } {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const isMobile = useMediaQuery("(min-width: 768px)");

	const columns = React.useMemo(() => {
		if (isDesktop) return 3;
		if (isMobile) return 2;

		return 1;
	}, [isDesktop, isMobile]);

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
}

function Gallery<T extends object | string>({
	className,
	images = [],
	children,
	...props
}: GalleryProps<T>) {
	const galleryData = useGallery(images);

	return (
		<div
			className={cn(
				"grid gap-4",
				galleryData.columns === 1 && "grid-cols-1",
				galleryData.columns === 2 && "grid-cols-2",
				galleryData.columns === 3 && "grid-cols-3",
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
