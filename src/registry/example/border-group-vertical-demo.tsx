import { BorderGroup } from "@/registry/ui/border-group";
import { Button } from "@/registry/ui/button";

export default function BorderGroupHorizontalDemo() {
	return (
		<BorderGroup orientation="vertical">
			<Button variant="outline">Default</Button>
			<Button variant="outline">Default</Button>
			<Button variant="outline">Default</Button>
		</BorderGroup>
	);
}
