import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<Alert>
				<AlertTitle>No Icon</AlertTitle>
				<AlertDescription>
					You can add components to your app using the cli.
				</AlertDescription>
			</Alert>
			<Alert>
				<Terminal className="h-4 w-4" />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					You can add components to your app using the cli.
				</AlertDescription>
			</Alert>
			<Alert variant="outline">
				<Terminal className="h-4 w-4" />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					You can add components to your app using the cli.
				</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Your session has expired. Please log in again.
				</AlertDescription>
			</Alert>
			<Alert variant="success">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Success</AlertTitle>
				<AlertDescription>
					Your session has expired. Please log in again.
				</AlertDescription>
			</Alert>
			<Alert variant="info">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Info</AlertTitle>
				<AlertDescription>
					Your session has expired. Please log in again.
				</AlertDescription>
			</Alert>
			<Alert variant="warning">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>
					Your session has expired. Please log in again.
				</AlertDescription>
			</Alert>
		</div>
	);
}
