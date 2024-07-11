import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";

export default function AlertNoIconDemo() {
	return (
		<Alert className="max-w-lg" variant="outline">
			<AlertTitle>No Icon</AlertTitle>
			<AlertDescription>
				You can add components to your app using the cli.
			</AlertDescription>
		</Alert>
	);
}
