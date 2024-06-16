"use client";

import * as React from "react";

import {
	CheckboxGroup as _CheckboxGroup,
	type CheckboxGroupProps as _CheckboxGroupProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

export interface CheckboxGroupProps extends _CheckboxGroupProps {}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
	({ className, ...props }, ref) => (
		<_CheckboxGroup
			ref={ref}
			className={(values) =>
				cn(
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	),
);
CheckboxGroup.displayName = _CheckboxGroup.name;

export { CheckboxGroup };
