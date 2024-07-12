"use client";
import Preview from "@/components/preview";
import {
	ImageMagnifier,
	ImageMagnifierSource,
	ImageMagnifierTarget,
} from "@/registry/ui/image-magnifier";

const imageUrl =
	"https://images.unsplash.com/photo-1720072480814-e1e5bf1937ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8";

export default function ImageMagnifierPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<ImageMagnifier imageUrl={imageUrl}>
					<ImageMagnifierSource />
					<ImageMagnifierTarget />
				</ImageMagnifier>
			</Preview>
		</div>
	);
}
