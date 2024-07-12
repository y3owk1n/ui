import { cn } from "@/lib/utils";
import { Badge } from "@/registry/ui/badge";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/ui/carousel";
import { useCallback, useEffect, useState } from "react";

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

export default function CarouselDemo() {
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
				<CarouselContent className="gap-1">
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
