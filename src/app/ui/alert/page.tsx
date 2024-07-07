import Preview from "@/components/preview";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";

export default function AlertPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Alert className="max-w-lg">
					<AlertTitle>No Icon</AlertTitle>
					<AlertDescription>
						You can add components to your app using the cli.
					</AlertDescription>
				</Alert>
			</Preview>
			<Preview>
				<Alert className="max-w-lg">
					<Terminal className="h-4 w-4" />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>
						You can add components to your app using the cli.
					</AlertDescription>
				</Alert>
			</Preview>
			<Preview>
				<Alert className="max-w-lg" variant="outline">
					<Terminal className="h-4 w-4" />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>
						You can add components to your app using the cli.
					</AlertDescription>
				</Alert>
			</Preview>
			<Preview>
				<Alert className="max-w-lg" variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Your session has expired. Please log in again.
					</AlertDescription>
				</Alert>
			</Preview>
			<Preview>
				<Alert className="max-w-lg" variant="success">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>
						Your session has expired. Please log in again.
					</AlertDescription>
				</Alert>
			</Preview>
			<Preview>
				<Alert className="max-w-lg" variant="info">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Info</AlertTitle>
					<AlertDescription>
						Your session has expired. Please log in again.
					</AlertDescription>
				</Alert>
			</Preview>
			<Preview>
				<Alert className="max-w-lg" variant="warning">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>
						Your session has expired. Please log in again.
					</AlertDescription>
				</Alert>
			</Preview>
		</div>
	);
}
