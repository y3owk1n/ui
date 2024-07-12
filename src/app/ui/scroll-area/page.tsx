import Preview from "@/components/preview";
import { ScrollArea } from "@/registry/ui/scroll-area";

function Content(props: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props}>
			Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
			ullamco deserunt aute id consequat veniam incididunt duis in sint
			irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
			officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
			exercitation reprehenderit magna aute tempor cupidatat consequat
			elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
			cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
			laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse
			laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
			nostrud ad veniam. Est velit labore esse esse cupidatat. Velit id
			elit consequat minim. Mollit enim excepteur ea laboris adipisicing
			aliqua proident occaecat do do adipisicing adipisicing ut fugiat.
			Consequat pariatur ullamco aute sunt esse. Irure excepteur eu non
			eiusmod. Commodo commodo et ad ipsum elit esse pariatur sit
			adipisicing sunt excepteur enim. Incididunt duis commodo
		</div>
	);
}

export default function ScrollAreaPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<ScrollArea
					orientation="vertical"
					className="h-[400px] w-[300px]"
				>
					<Content />
				</ScrollArea>
			</Preview>
			<Preview>
				<ScrollArea
					showShadow
					orientation="vertical"
					className="h-[400px] w-[300px]"
				>
					<Content />
				</ScrollArea>
			</Preview>
			<Preview>
				<ScrollArea
					orientation="horizontal"
					className="max-h-[300px] max-w-[400px]"
				>
					<Content className="w-[800px]" />
				</ScrollArea>
			</Preview>
			<Preview>
				<ScrollArea
					showShadow
					orientation="horizontal"
					className="max-h-[300px] max-w-[400px]"
				>
					<Content className="w-[800px]" />
				</ScrollArea>
			</Preview>
		</div>
	);
}
