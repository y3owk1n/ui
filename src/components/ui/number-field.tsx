"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
	NumberField as _NumberField,
	type NumberFieldProps as _NumberFieldProps,
} from "react-aria-components";

interface NumberFieldProps extends _NumberFieldProps {}

const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_NumberField
				ref={ref}
				className={(values) =>
					cn(
						"group",
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

export { NumberField, type NumberFieldProps };
