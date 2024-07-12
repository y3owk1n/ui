"use client";
import { Badge } from "@/registry/ui/badge";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/ui/carousel";
import {
	ImageMagnifier,
	ImageMagnifierSource,
	ImageMagnifierTarget,
} from "@/registry/ui/image-magnifier";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarouselLeftThumbProps {
	images: string[];
}

export default function CarouselNoThumbWithMagnifier({
	images,
}: CarouselLeftThumbProps) {
	const mainRef = useRef<HTMLDivElement>(null);

	const [mainApi, setMainApi] = useState<CarouselApi>();

	const [selectedIndex, setSelectedIndex] = useState(0);

	const [count, setCount] = useState(0);

	const onSelect = useCallback(() => {
		if (!mainApi) return;
		setSelectedIndex(mainApi.selectedScrollSnap());
	}, [mainApi]);

	useEffect(() => {
		if (!mainApi) return;
		onSelect();

		setCount(mainApi.scrollSnapList().length);

		mainApi.on("select", onSelect).on("reInit", onSelect);
	}, [mainApi, onSelect]);

	return (
		<div className="flex w-full max-w-[500px] flex-col gap-2">
			<Carousel className="w-full" setApi={setMainApi}>
				<CarouselContent className="gap-1" ref={mainRef}>
					{images.map((image, index) => (
						<CarouselItem key={index} className="">
							<ImageMagnifier imageUrl={image}>
								<ImageMagnifierSource className="aspect-square h-full w-full rounded-md border bg-gray-100 bg-muted object-contain transition-all duration-200" />
								<ImageMagnifierTarget />
							</ImageMagnifier>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className="left-4" />
				<CarouselNext className="right-4" />
				<Badge variant="outline" className="absolute right-0 top-0 m-2">
					{selectedIndex + 1} of {count}
				</Badge>
			</Carousel>
		</div>
	);
}
