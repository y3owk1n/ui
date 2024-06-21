import { BorderGroup } from "@/components/ui/border-group";
import { Button } from "@/components/ui/button";

export default function ButtonPage() {
	return (
		<div className="flex flex-col gap-4">
			<BorderGroup>
				<Button variant="destructive">hello</Button>
				<Button>hello</Button>
				<Button variant="outline">hello</Button>
				<Button variant="destructive">hello</Button>
				<Button variant="destructive">hello</Button>
			</BorderGroup>
			<BorderGroup orientation="vertical">
				<Button variant="destructive">hello</Button>
				<Button>hello</Button>
				<Button variant="outline">hello</Button>
				<Button variant="destructive">hello</Button>
				<Button variant="destructive">hello</Button>
			</BorderGroup>
			<BorderGroup>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup orientation="vertical">
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup orientation="vertical">
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup orientation="vertical">
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup orientation="vertical">
				<Button variant="outline">Default</Button>
				<Button variant="outline">Default</Button>
			</BorderGroup>
			<BorderGroup orientation="vertical">
				<Button variant="outline">Default</Button>
			</BorderGroup>
		</div>
	);
}
