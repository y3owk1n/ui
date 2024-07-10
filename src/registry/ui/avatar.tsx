"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	alt?: string;
	src?: string;
	fallback?: React.ReactNode;
}

function Avatar({
	className,
	alt = "",
	src,
	fallback = "FB",
	...props
}: AvatarProps) {
	const avatarRef = React.useRef<HTMLDivElement | null>(null);
	const imgRef = React.useRef<HTMLImageElement | null>(null);

	React.useLayoutEffect(() => {
		if (src) {
			const image = new window.Image();

			image.onload = () => {
				if (imgRef.current && avatarRef.current) {
					imgRef.current.src = image.src;
					avatarRef.current.dataset.fallback = String(false);
				}
			};
			image.onerror = () => {
				if (avatarRef.current) {
					avatarRef.current.dataset.fallback = String(true);
				}
			};
			image.src = src;
		}
	}, [src]);

	return (
		<div
			ref={avatarRef}
			className={cn(
				"group size-10 overflow-hidden rounded-full bg-muted text-muted-foreground",
				className,
			)}
			data-fallback={String(true)}
		>
			<img
				ref={imgRef}
				alt={alt}
				className={cn(
					"aspect-square h-full w-full object-cover",
					"group-data-[fallback=true]:hidden",
				)}
				{...props}
			/>
			<span
				className={cn(
					"grid aspect-square h-full w-full place-items-center",
					"group-data-[fallback=false]:hidden",
				)}
			>
				{fallback}
			</span>
		</div>
	);
}

export { Avatar };
