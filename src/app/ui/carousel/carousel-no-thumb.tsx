"use client";
import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarouselLeftThumbProps {
	images: string[];
}

export default function CarouselNoThumb({ images }: CarouselLeftThumbProps) {
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
							<img
								src={image}
								alt=""
								className={cn(
									"aspect-square h-full w-full rounded-md border bg-gray-100 bg-muted object-contain transition-all duration-200",
								)}
							/>
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
