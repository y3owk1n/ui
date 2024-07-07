"use client";
import Preview from "@/components/preview";
import { Gallery, GalleryItem } from "@/components/ui/gallery";

const images = [
	"https://images.unsplash.com/photo-1720072480814-e1e5bf1937ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
	"https://images.unsplash.com/photo-1720033130644-3e78085b3526?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
	"https://images.unsplash.com/photo-1719958039745-b5081c9ce0f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719518870616-8deacda7e18b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1720127365685-e4b6f23fe60f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719831400714-5d4fe425cd8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719733250222-d7f51c02a4ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1720072480814-e1e5bf1937ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
	"https://images.unsplash.com/photo-1720033130644-3e78085b3526?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
	"https://images.unsplash.com/photo-1719518870616-8deacda7e18b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1720127365685-e4b6f23fe60f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719176372344-b29f6613e870?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719831400714-5d4fe425cd8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719958039745-b5081c9ce0f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1719733250222-d7f51c02a4ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D",
];

export default function GalleryPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Gallery images={images}>
					{(galleryRootItem) => (
						<>
							{Array.from({
								length: galleryRootItem.columns,
							}).map((_, rootIndex) => (
								<GalleryItem key={rootIndex}>
									{galleryRootItem.data[rootIndex]?.map(
										(item, index) => (
											<img
												className="h-auto w-auto rounded-md"
												src={item}
												key={index}
												alt=""
											/>
										),
									)}
								</GalleryItem>
							))}
						</>
					)}
				</Gallery>
			</Preview>
			<Preview>
				<Gallery
					opts={{
						responsive: {
							lg: 3,
							md: 2,
							sm: 1,
						},
					}}
					images={images}
				>
					{(galleryRootItem) => (
						<>
							{Array.from({
								length: galleryRootItem.columns,
							}).map((_, rootIndex) => (
								<GalleryItem key={rootIndex}>
									{galleryRootItem.data[rootIndex]?.map(
										(item, index) => (
											<img
												className="h-auto w-auto rounded-md"
												src={item}
												key={index}
												alt=""
											/>
										),
									)}
								</GalleryItem>
							))}
						</>
					)}
				</Gallery>
			</Preview>
		</div>
	);
}
