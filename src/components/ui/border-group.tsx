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
						? "w-full flex-row flex-nowrap [&>*:first-child]:rounded-none [&>*:first-child]:rounded-l-md [&>*:first-child:not(:only-child)]:border-r-0 [&>*:last-child]:rounded-none [&>*:last-child]:rounded-r-md [&>*:last-child:not(:nth-child(2)):not(:only-child)]:border-l-0 [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:border-l-0 [&>*:only-child]:rounded-md"
						: "",
					orientation === "vertical"
						? "w-fit flex-col inline-flex [&>*:first-child]:rounded-none [&>*:first-child]:rounded-t-md [&>*:first-child:not(:only-child)]:border-b-0 [&>*:last-child]:rounded-none [&>*:last-child]:rounded-b-md [&>*:last-child:not(:nth-child(2)):not(:only-child)]:border-t-0 [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child):not(:last-child):not(:nth-child(2))]:border-t-0 [&>*:only-child]:rounded-md"
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
