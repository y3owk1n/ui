"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import {
	NumberField as _NumberField,
	type NumberFieldProps as _NumberFieldProps,
} from "react-aria-components";
import { Button } from "./button";
import { Input } from "./input";

interface NumberFieldProps extends _NumberFieldProps {}

const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_NumberField
				ref={ref}
				className={(values) =>
					cn(
						"group flex flex-col gap-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				{...props}
			/>
		);
	},
);
NumberField.displayName = "NumberField";

const NumberMinusButton = ({
	className,
	variant = "outline",
	...props
}: React.ComponentProps<typeof Button>) => (
	<Button
		slot="decrement"
		aria-label="decrement number"
		variant={variant}
		size="icon"
		className={cn("", className)}
		{...props}
	>
		<Minus className="h-4 w-4" />
	</Button>
);
NumberMinusButton.displayName = "NumberMinusButton";

const NumberPlusButton = ({
	className,
	variant = "outline",
	...props
}: React.ComponentProps<typeof Button>) => (
	<Button
		slot="increment"
		aria-label="increment number"
		variant={variant}
		size="icon"
		className={cn("", className)}
		{...props}
	>
		<Plus className="h-4 w-4" />
	</Button>
);
NumberPlusButton.displayName = "NumberPlusButton";

const NumberInput = Input;

export {
	NumberField,
	NumberMinusButton,
	NumberPlusButton,
	NumberInput,
	type NumberFieldProps,
};
