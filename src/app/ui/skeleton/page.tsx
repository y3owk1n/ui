import Preview from "@/components/preview";
import { Skeleton } from "@/registry/ui/skeleton";

export default function LabelPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-[125px] w-[250px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</Preview>
		</div>
	);
}
