"use client";

import * as React from "react";

import { Keyboard as _Keyboard } from "react-aria-components";

import { cn } from "@/lib/utils";

type KeyboardProps = React.HTMLAttributes<HTMLElement> & {
	modifier?: string;
};

const Keyboard = React.forwardRef<HTMLElement, KeyboardProps>(
	({ className, modifier, children, ...props }, ref) => (
		<_Keyboard
			ref={ref}
			className={cn(
				"pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium",
				className,
			)}
			{...props}
		>
			{modifier ? <span className="text-xs">{modifier}</span> : null}

			{children}
		</_Keyboard>
	),
);
Keyboard.displayName = "Keyboard";

export { Keyboard, type KeyboardProps };
