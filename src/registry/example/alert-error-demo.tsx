import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AlertErrorDemo() {
	return (
		<Alert className="max-w-lg" variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Your session has expired. Please log in again.
			</AlertDescription>
		</Alert>
	);
}
