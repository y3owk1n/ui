import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AlertInfoDemo() {
	return (
		<Alert className="max-w-lg" variant="info">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Info</AlertTitle>
			<AlertDescription>
				Our staffs will never ask for your password.
			</AlertDescription>
		</Alert>
	);
}
