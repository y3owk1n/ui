import {
	Alert,
	AlertDescription,
	AlertTitle,
	type alertVariants,
} from "@/registry/ui/alert";
import { type VariantProps } from "class-variance-authority";

interface CalloutProps {
	icon?: string;
	title?: string;
	children?: React.ReactNode;
	variant?: VariantProps<typeof alertVariants>["variant"];
}

export function Callout({
	title,
	children,
	icon,
	variant = "warning",
	...props
}: CalloutProps) {
	return (
		<Alert variant={variant} {...props}>
			{icon && <span className="mr-4 text-2xl">{icon}</span>}
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
}
