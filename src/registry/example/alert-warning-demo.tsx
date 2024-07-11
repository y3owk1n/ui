import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AlertWarningDemo() {
	return (
		<Alert className="max-w-lg" variant="warning">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Warning</AlertTitle>
			<AlertDescription>
				Please be careful when putting in your credentials.
			</AlertDescription>
		</Alert>
	);
}
