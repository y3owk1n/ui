import Preview from "@/components/preview";
import { ToggleButton } from "@/registry/ui/toggle-button";
import { Bold } from "lucide-react";

export default function ToggleButtonPage() {
	return (
		<Preview>
			<div className="flex gap-4">
				<ToggleButton aria-label="Toggle Bold">
					<Bold className="h-4 w-4" />
				</ToggleButton>
				<ToggleButton variant="outline" aria-label="Toggle Bold">
					<Bold className="h-4 w-4" />
				</ToggleButton>
				<ToggleButton
					defaultSelected
					variant="outline"
					aria-label="Toggle Bold"
				>
					<Bold className="h-4 w-4" />
				</ToggleButton>
				<ToggleButton isDisabled aria-label="Toggle Bold">
					<Bold className="h-4 w-4" />
				</ToggleButton>
			</div>
		</Preview>
	);
}
