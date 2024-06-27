import { Badge } from "@/components/ui/badge";

export default function CheckboxPage() {
	return (
		<div className="flex flex-wrap gap-4">
			<Badge>Badge</Badge>
			<Badge variant="outline">Badge</Badge>
			<Badge variant="destructive">Badge</Badge>
			<Badge variant="warning">Badge</Badge>
			<Badge variant="info">Badge</Badge>
			<Badge variant="success">Badge</Badge>
			<Badge variant="secondary">Badge</Badge>
			<Badge variant="unstyled">Badge</Badge>
		</div>
	);
}
