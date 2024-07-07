import Preview from "@/components/preview";
import { Keyboard } from "@/components/ui/keyboard";

export default function KeyboardPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Keyboard>⇧⌘Q</Keyboard>
			</Preview>
		</div>
	);
}
