import { cn } from "@/lib/utils";
import { Badge } from "@/registry/ui/badge";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselNextItem,
	CarouselPrevious,
	CarouselPreviousItem,
} from "@/registry/ui/carousel";
import { useCallback, useEffect, useRef, useState } from "react";

const images = [
	"https://images.unsplash.com/photo-1720072480814-e1e5bf1937ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
	"https://images.unsplash.com/photo-1720033130644-3e78085b3526?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
	"https://images.unsplash.com/photo-1719958039745-b5081c9ce0f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719518870616-8deacda7e18b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1720127365685-e4b6f23fe60f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719831400714-5d4fe425cd8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719733250222-d7f51c02a4ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719176372344-b29f6613e870?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D",
];

const slides = 4;

export default function CarouselLeftThumbDemo() {
	const mainRef = useRef<HTMLDivElement>(null);
	const navigationRef = useRef<HTMLDivElement>(null);

	const [mainApi, setMainApi] = useState<CarouselApi>();
	const [thumbApi, setThumbApi] = useState<CarouselApi>();

	const [selectedIndex, setSelectedIndex] = useState(0);

	const [count, setCount] = useState(0);

	const [height, setHeight] = useState(0);
	const [slideSize, setSlideSize] = useState(0);

	const [render, setRender] = useState(false);

	const [fakeLoading, setFakeLoading] = useState(true);

	useEffect(() => {
		if (!render) {
			setRender(true);
		}
	}, [render]);

	const handleSize = useCallback(() => {
		if (mainRef.current?.clientHeight) {
			const currentHeight = mainRef.current.clientHeight;
			const currentNavHeight = navigationRef.current?.clientHeight ?? 0;

			const margin = 4; // gap-1, remember to change when gap changes

			setHeight(currentHeight - currentNavHeight);

			const size =
				(currentHeight - currentNavHeight - (slides - 1) * margin) /
				slides;

			setSlideSize(size);
		}
		setFakeLoading(false);
	}, []);

	useEffect(() => {
		handleSize();

		window.addEventListener("resize", handleSize);

		return () => {
			window.removeEventListener("resize", handleSize);
		};
	}, [handleSize]);

	useEffect(() => {
		if (render) {
			handleSize();
		}
	}, [handleSize, render]);

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
	}, [mainApi, selectedIndex, thumbApi]);

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
	}, [mainApi, selectedIndex, thumbApi]);

	useEffect(() => {
		if (!mainApi) return;
		onSelect();

		setCount(mainApi.scrollSnapList().length);

		mainApi.on("select", onSelect).on("reInit", onSelect);
	}, [mainApi, onSelect]);
	return (
		<div className="flex w-full max-w-[500px] gap-2">
			<Carousel
				setApi={setThumbApi}
				opts={{
					align: "start",
					containScroll: "keepSnaps",
					dragFree: true,
				}}
				className={cn(
					"hidden transition-all duration-200 sm:inline-block",
					fakeLoading && "opacity-0",
				)}
				orientation="vertical"
			>
				<CarouselContent
					className={cn("gap-1")}
					style={{
						height: height ?? "100%",
						width: slideSize ?? "100%",
					}}
				>
					{images.map((image, index) => (
						<CarouselItem
							key={index}
							// 0.25rem for gap-1
							style={{
								flexBasis: `calc((100% / ${slides}) - 0.25rem)`,
							}}
						>
							<img
								onClick={() => onThumbClick(index)}
								src={image}
								alt=""
								className={cn(
									"aspect-square rounded-md border-2 border-transparent bg-muted object-contain",
									selectedIndex === index && "border-primary",
								)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<div
					ref={navigationRef}
					className="mt-2 flex justify-center gap-2"
				>
					<CarouselPreviousItem onPress={handlePrevItem} />
					<CarouselNextItem onPress={handleNextItem} />
				</div>
			</Carousel>
			<Carousel className="w-full" setApi={setMainApi}>
				<CarouselContent className="gap-1" ref={mainRef}>
					{images.map((image, index) => (
						<CarouselItem key={index} className="">
							<img
								src={image}
								alt=""
								className={cn(
									"aspect-square h-full w-full rounded-md border bg-muted object-contain transition-all duration-200",
									fakeLoading && "opacity-0",
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
		</div>
	);
}
