"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ImageMagnifierContextType {
	magnifierPosition: { x: number; y: number };
	setMagnifierPosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>;
	isMagnifierVisible: boolean;
	setIsMagnifierVisible: React.Dispatch<React.SetStateAction<boolean>>;
	imageRef: React.RefObject<HTMLImageElement>;
	imageUrl: string;
	zoomLevel: number;
	imageSize: { width: number; height: number };
	setImageSize: React.Dispatch<
		React.SetStateAction<{ width: number; height: number }>
	>;
	visibleBounds: { top: number; left: number; width: number; height: number };
	setVisibleBounds: React.Dispatch<
		React.SetStateAction<{
			top: number;
			left: number;
			width: number;
			height: number;
		}>
	>;
}

export const ImageMagnifierContext = React.createContext<
	ImageMagnifierContextType | undefined
>(undefined);

interface ImageMagnifierProps extends React.HTMLAttributes<HTMLDivElement> {
	imageUrl: string;
	zoomLevel?: number;
}

const ImageMagnifier = React.forwardRef<HTMLDivElement, ImageMagnifierProps>(
	({ className, zoomLevel = 2, imageUrl, ...props }, ref) => {
		const [magnifierPosition, setMagnifierPosition] = React.useState({
			x: 0,
			y: 0,
		});
		const [isMagnifierVisible, setIsMagnifierVisible] =
			React.useState(false);
		const [imageSize, setImageSize] = React.useState({
			width: 0,
			height: 0,
		});

		const [visibleBounds, setVisibleBounds] = React.useState({
			top: 0,
			left: 0,
			width: 0,
			height: 0,
		});
		const imageRef = React.useRef<HTMLImageElement>(null);

		const contextValue = React.useMemo(() => {
			return {
				magnifierPosition,
				setMagnifierPosition,
				isMagnifierVisible,
				setIsMagnifierVisible,
				imageRef,
				imageUrl,
				zoomLevel,
				imageSize,
				setImageSize,
				visibleBounds,
				setVisibleBounds,
			};
		}, [
			imageSize,
			imageUrl,
			isMagnifierVisible,
			magnifierPosition,
			visibleBounds,
			zoomLevel,
		]);

		return (
			<ImageMagnifierContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={cn("relative overflow-hidden", className)}
					{...props}
				/>
			</ImageMagnifierContext.Provider>
		);
	},
);
ImageMagnifier.displayName = "ImageMagnifier";

const ImageMagnifierSource = React.forwardRef<
	HTMLImageElement,
	React.HTMLAttributes<HTMLImageElement> & {
		alt?: string;
	}
>(({ className, alt = "zoomable", ...props }, ref) => {
	const context = React.useContext(ImageMagnifierContext);

	if (!context) {
		throw new Error(
			"ImageMagnifierSource must be used within a ImageMagnifier",
		);
	}

	const {
		imageRef,
		imageUrl,
		setMagnifierPosition,
		setIsMagnifierVisible,
		isMagnifierVisible,
		setImageSize,
		visibleBounds,
		setVisibleBounds,
	} = context;
	const [isLoaded, setIsLoaded] = React.useState(false);

	React.useEffect(() => {
		if (imageRef.current) {
			const ref = imageRef.current;

			const updateImageSize = () => {
				const { naturalWidth, naturalHeight } = ref;
				setImageSize({ width: naturalWidth, height: naturalHeight });

				// Calculate the visible bounds
				const containerWidth = ref.clientWidth;
				const containerHeight = ref.clientHeight;
				const aspectRatio = naturalWidth / naturalHeight;

				let visibleWidth, visibleHeight;
				if (aspectRatio > 1) {
					visibleWidth = containerWidth;
					visibleHeight = containerWidth / aspectRatio;
				} else {
					visibleWidth = containerHeight * aspectRatio;
					visibleHeight = containerHeight;
				}

				setVisibleBounds({
					top: (containerHeight - visibleHeight) / 2,
					left: (containerWidth - visibleWidth) / 2,
					width: visibleWidth,
					height: visibleHeight,
				});

				setIsLoaded(true);
			};

			updateImageSize(); // Initial size setting
			ref.addEventListener("load", updateImageSize); // Update on image load

			return () => {
				ref.removeEventListener("load", updateImageSize);
			};
		}
	}, [imageRef, setImageSize, setVisibleBounds]);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>,
	) => {
		if (imageRef.current) {
			const { left, top, width, height } =
				imageRef.current.getBoundingClientRect();
			const offsetX = e.clientX - left;
			const offsetY = e.clientY - top;

			// Check if the mouse is within the actual image bounds
			if (
				offsetX >= visibleBounds.left &&
				offsetX <= visibleBounds.left + visibleBounds.width &&
				offsetY >= visibleBounds.top &&
				offsetY <= visibleBounds.top + visibleBounds.height
			) {
				setMagnifierPosition({
					x: offsetX - visibleBounds.left,
					y: offsetY - visibleBounds.top,
				});
				setIsMagnifierVisible(true);
			} else {
				setIsMagnifierVisible(false);
			}
		}
	};

	const handleMouseEnter = () => {
		if (imageRef.current && isLoaded) {
			setIsMagnifierVisible(true);
		}
	};

	const handleMouseLeave = () => {
		setIsMagnifierVisible(false);
	};

	return (
		<img
			src={imageUrl}
			alt={alt}
			className={cn(
				"h-full w-full rounded-md object-cover transition-opacity duration-100 ease-in-out",
				isMagnifierVisible ? "opacity-0" : "opacity-100",
				className,
			)}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={imageRef}
			{...props}
		/>
	);
});
ImageMagnifierSource.displayName = "ImageMagnifierSource";

const ImageMagnifierTarget = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const context = React.useContext(ImageMagnifierContext);

	if (!context) {
		throw new Error(
			"ImageMagnifierTarget must be used within a ImageMagnifier",
		);
	}

	const {
		magnifierPosition,
		isMagnifierVisible,
		imageRef,
		imageUrl,
		zoomLevel,
		imageSize,
		visibleBounds,
	} = context;

	const magnifierStyle = React.useMemo(() => {
		if (imageRef.current) {
			const aspectRatio = imageSize.width / imageSize.height;
			const containerAspectRatio =
				visibleBounds.width / visibleBounds.height;

			let backgroundSize;
			if (aspectRatio > containerAspectRatio) {
				backgroundSize = `${zoomLevel * visibleBounds.width}px auto`;
			} else {
				backgroundSize = `auto ${zoomLevel * visibleBounds.height}px`;
			}

			return {
				backgroundImage: `url(${imageUrl})`,
				backgroundSize: backgroundSize,
				backgroundPosition: `${(magnifierPosition.x / visibleBounds.width) * 100}% ${(magnifierPosition.y / visibleBounds.height) * 100}%`,
				width: `${visibleBounds.width}px`,
				height: `${visibleBounds.height}px`,
				left: `${visibleBounds.left}px`,
				top: `${visibleBounds.top}px`,
				display: isMagnifierVisible ? "block" : "none",
			};
		}
	}, [
		imageRef,
		imageSize.width,
		imageSize.height,
		visibleBounds.width,
		visibleBounds.height,
		visibleBounds.left,
		visibleBounds.top,
		imageUrl,
		magnifierPosition.x,
		magnifierPosition.y,
		isMagnifierVisible,
		zoomLevel,
	]);

	return (
		<div
			className={cn(
				"pointer-events-none absolute z-10 transition-all duration-75 ease-in-out",
				className,
			)}
			style={magnifierStyle}
			{...props}
		/>
	);
});
ImageMagnifierTarget.displayName = "ImageMagnifierTarget";

export { ImageMagnifier, ImageMagnifierSource, ImageMagnifierTarget };
