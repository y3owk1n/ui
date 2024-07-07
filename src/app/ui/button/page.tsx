import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";

export default function ButtonPage() {
	return (
		<Preview>
			<div className="flex flex-wrap gap-4">
				<Button>Default</Button>
				<Button variant="destructive">Destructive</Button>
				<Button variant="success">Success</Button>
				<Button variant="warning">Warning</Button>
				<Button variant="info">Info</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="link">Link</Button>
				<Button isDisabled>disabled</Button>
				<Button isLoading>loading</Button>
			</div>
		</Preview>
	);
}
