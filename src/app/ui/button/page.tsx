import { Button } from "@/components/ui/button";

export default function ButtonPage() {
	return (
		<div className="flex gap-4">
			<Button>Default</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
			<Button>Destructive</Button>
			<Button isDisabled>disabled</Button>
			<Button isLoading>loading</Button>
		</div>
	);
}
