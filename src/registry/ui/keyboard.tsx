"use client";

import * as React from "react";

import { Keyboard as _Keyboard } from "react-aria-components";

import { cn } from "@/lib/utils";

interface KeyboardProps extends React.HTMLAttributes<HTMLElement> {}

const Keyboard = React.forwardRef<HTMLElement, KeyboardProps>(
	({ className, ...props }, ref) => (
		<_Keyboard
			ref={ref}
			className={cn("rounded-md bg-muted p-1", className)}
			{...props}
		/>
	),
);
Keyboard.displayName = "Keyboard";

export { Keyboard, type KeyboardProps };
