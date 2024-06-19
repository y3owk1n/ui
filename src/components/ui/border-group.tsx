import { cn } from "@/lib/utils";
import * as React from "react";

interface BorderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
}

const BorderGroup = React.forwardRef<HTMLDivElement, BorderGroupProps>(
	({ className, orientation = "horizontal", ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex w-full flex-row flex-nowrap",
					orientation === "horizontal"
						? "[&>*:first-child]:rounded-none [&>*:first-child]:rounded-l-md [&>*:first-child]:border-r-0 [&>*:last-child]:rounded-none [&>*:last-child]:rounded-r-md [&>*:last-child]:border-l-0 [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:border-l-0 [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:only-child]:rounded-md"
						: "",
					orientation === "vertical"
						? "[&>*:first-child]:rounded-none [&>*:first-child]:rounded-t-md [&>*:first-child]:border-b-0 [&>*:last-child]:rounded-none [&>*:last-child]:rounded-b-md [&>*:last-child]:border-t-0 [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:rounded-none [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:border-t-0 [&>*:nth-child(2)]:border-t [&>*:only-child]:rounded-md"
						: "",
					className,
				)}
				{...props}
			/>
		);
	},
);

BorderGroup.displayName = "BorderGroup";

export { BorderGroup, type BorderGroupProps };