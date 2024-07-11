import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { Terminal } from "lucide-react";

export default function AlertDemo() {
	return (
		<Alert className="max-w-lg" variant="outline">
			<Terminal className="h-4 w-4" />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can add components to your app using the cli.
			</AlertDescription>
		</Alert>
	);
}
