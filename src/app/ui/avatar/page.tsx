import Preview from "@/components/preview";
import { Avatar } from "@/registry/ui/avatar";

const src =
	"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80";

export default function BadgePage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<div className="flex flex-wrap gap-4">
					<Avatar src={src} />
					<Avatar />
					<Avatar fallback="UN" />
				</div>
			</Preview>
			<Preview>
				<div className="flex flex-wrap gap-4">
					<Avatar src={src} />
					<Avatar className="size-14" src={src} />
					<Avatar className="size-20" src={src} />
				</div>
			</Preview>
		</div>
	);
}
