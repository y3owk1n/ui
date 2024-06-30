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
					"flex",
					orientation === "horizontal"
						? "flex-row flex-nowrap [&>*:first-child:not(:only-child)]:border-r-0 [&>*:first-child]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child:not(:nth-child(2)):not(:only-child)]:border-l-0 [&>*:last-child]:rounded-none [&>*:last-child]:rounded-r-md [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:border-l-0 [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:only-child]:rounded-md"
						: "",
					orientation === "vertical"
						? "inline-flex w-fit flex-col [&>*:first-child:not(:only-child)]:border-b-0 [&>*:first-child]:rounded-none [&>*:first-child]:rounded-t-md [&>*:last-child:not(:nth-child(2)):not(:only-child)]:border-t-0 [&>*:last-child]:rounded-none [&>*:last-child]:rounded-b-md [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:border-t-0 [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:only-child]:rounded-md"
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
