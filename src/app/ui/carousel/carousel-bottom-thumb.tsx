"use client";
import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselNextItem,
	CarouselPrevious,
	CarouselPreviousItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarouselLeftThumbProps {
	images: string[];
}

export default function CarouselLeftThumb({ images }: CarouselLeftThumbProps) {
	const mainRef = useRef<HTMLDivElement>(null);

	const [mainApi, setMainApi] = useState<CarouselApi>();
	const [thumbApi, setThumbApi] = useState<CarouselApi>();

	const [selectedIndex, setSelectedIndex] = useState(0);

	const [count, setCount] = useState(0);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!mainApi || !thumbApi) return;
			mainApi.scrollTo(index);
		},
		[mainApi, thumbApi],
	);

	const onSelect = useCallback(() => {
		if (!mainApi || !thumbApi) return;
		setSelectedIndex(mainApi.selectedScrollSnap());
		thumbApi.scrollTo(mainApi.selectedScrollSnap());
	}, [mainApi, thumbApi]);

	const handleNextItem = useCallback(() => {
		if (!mainApi || !thumbApi) return;
		if (selectedIndex + 1 > images.length - 1) {
			setSelectedIndex(0);
			mainApi.scrollTo(0);
			thumbApi.scrollTo(0);
			return;
		}

		setSelectedIndex(selectedIndex + 1);
		mainApi.scrollTo(selectedIndex + 1);
		thumbApi.scrollTo(selectedIndex + 1);
	}, [images.length, mainApi, selectedIndex, thumbApi]);

	const handlePrevItem = useCallback(() => {
		if (!mainApi || !thumbApi) return;
		if (selectedIndex - 1 < 0) {
			setSelectedIndex(images.length);
			mainApi.scrollTo(images.length);
			thumbApi.scrollTo(images.length);
			return;
		}

		setSelectedIndex(selectedIndex - 1);
		mainApi.scrollTo(selectedIndex - 1);
		thumbApi.scrollTo(selectedIndex - 1);
	}, [images.length, mainApi, selectedIndex, thumbApi]);

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
									"h-ful aspect-square w-full rounded-md border bg-muted object-contain transition-all duration-200",
								)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className="left-4 inline-flex sm:hidden" />
				<CarouselNext className="right-4 inline-flex sm:hidden" />
				<Badge variant="outline" className="absolute right-0 top-0 m-2">
					{selectedIndex + 1} of {count}
				</Badge>
			</Carousel>
			<div className="flex gap-2">
				<Carousel
					setApi={setThumbApi}
					opts={{
						align: "start",
						containScroll: "keepSnaps",
						dragFree: true,
					}}
					className={cn(
						"hidden transition-all duration-200 sm:inline-flex sm:items-center sm:gap-2",
					)}
				>
					<div>
						<CarouselPreviousItem onPress={handlePrevItem} />
					</div>

					<CarouselContent className={cn("gap-1")}>
						{images.map((image, index) => (
							<CarouselItem
								key={index}
								// 0.25rem for gap-1
								className="basis-[calc((100%/4)-0.25rem)]"
							>
								<img
									onClick={() => onThumbClick(index)}
									src={image}
									alt=""
									className={cn(
										"aspect-square rounded-md border-2 border-transparent bg-gray-100 bg-muted object-contain",
										selectedIndex === index &&
											"border-destructive-foreground",
									)}
								/>
							</CarouselItem>
						))}
					</CarouselContent>

					<div>
						<CarouselNextItem onPress={handleNextItem} />
					</div>
				</Carousel>
			</div>
		</div>
	);
}
