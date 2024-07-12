import Preview from "@/components/preview";
import { Label } from "@/registry/ui/label";

export default function LabelPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Label>This is a label</Label>
			</Preview>
		</div>
	);
}
