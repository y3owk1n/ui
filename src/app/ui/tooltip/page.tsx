import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Pencil } from "lucide-react";

export default function TooltipPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<TooltipTrigger>
					<Button variant="outline" size="icon" aria-label="Edit">
						<Pencil className="h-4 w-4" />
					</Button>
					<Tooltip>Edit</Tooltip>
				</TooltipTrigger>
			</Preview>
		</div>
	);
}
