import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AlertSuccessDemo() {
	return (
		<Alert className="max-w-lg" variant="success">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Success</AlertTitle>
			<AlertDescription>You're successfully logged-in!</AlertDescription>
		</Alert>
	);
}
