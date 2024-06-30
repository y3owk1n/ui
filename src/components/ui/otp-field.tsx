"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	TextField as _OtpField,
	type TextFieldProps as _OtpFieldProps,
} from "react-aria-components";
import { BorderGroup } from "./border-group";
import { Input } from "./input";

interface OtpFieldContextType {
	maxLength?: number;
	value: string;
	cursorPosition: number;
	isFocused: boolean;
	type: "numeric" | "text" | "both";
}

const OtpFieldContext = React.createContext<OtpFieldContextType | undefined>(
	undefined,
);

interface OtpFieldProps
	extends Omit<_OtpFieldProps, "children" | "type">,
		Pick<OtpFieldContextType, "maxLength" | "type"> {
	children: React.ReactNode;
	isFocused?: boolean;
}

const OtpField = React.forwardRef<HTMLInputElement, OtpFieldProps>(
	(
		{
			className,
			maxLength = 6,
			onSelect,
			onFocus,
			onBlur,
			value = "",
			onChange,
			children,
			isFocused = false,
			type = "numeric",
			...props
		},
		ref,
	) => {
		const [otpValue, setOtpValue] = React.useState(value);

		const [isOtpFocused, setIsOtpFocused] = React.useState(isFocused);

		const [cursorPosition, setCursorPosition] = React.useState(0);

		const filter = React.useMemo(() => {
			let filter: RegExp;

			switch (type) {
				case "numeric":
					filter = new RegExp(/^[0-9]$/);
					break;
				case "text":
					filter = new RegExp(/^[a-zA-Z]$/);
					break;
				case "both":
					filter = new RegExp(/^[a-zA-Z0-9]$/);
					break;

				default:
					filter = new RegExp(/^[a-zA-Z0-9]$/);
					break;
			}
			return filter;
		}, [type]);

		const handleChange = React.useCallback(
			(value: string) => {
				const replacedValue = value
					.split("")
					.filter((char) => filter.test(char))
					.join("");
				if (replacedValue.length > maxLength) return;
				setOtpValue(replacedValue);
				setCursorPosition(replacedValue.length);
				if (onChange) onChange(replacedValue);
			},
			[filter, maxLength, onChange],
		);

		const handleSelect = React.useCallback(
			(e: React.SyntheticEvent<HTMLInputElement>) => {
				const input = e.target as HTMLInputElement;
				if (input.selectionStart === 0 && input.value.length > 0) {
					setCursorPosition(1);

					requestAnimationFrame(() => {
						input.selectionStart = 1;
						input.selectionEnd = 1;
					});
				} else {
					setCursorPosition(
						input.selectionStart ? input.selectionStart : 0,
					);
				}

				if (onSelect) onSelect(e);
			},
			[onSelect],
		);

		const handleFocus = React.useCallback(
			(e: React.FocusEvent<Element, Element>) => {
				const target = e.target as HTMLInputElement;

				requestAnimationFrame(() => {
					target.selectionStart = maxLength;
					target.selectionEnd = maxLength;
				});

				setIsOtpFocused(true);
				if (onFocus) onFocus(e);
			},
			[maxLength, onFocus],
		);

		const handleBlur = React.useCallback(
			(e: React.FocusEvent<Element, Element>) => {
				setIsOtpFocused(false);
				if (onBlur) onBlur(e);
			},
			[onBlur],
		);

		const handleKeyDown = React.useCallback(
			(e: React.KeyboardEvent<HTMLInputElement>) => {
				const input = e.currentTarget;
				const value = input.value;
				const key = e.key;

				const validated = filter.test(key);

				if (
					key.length === 1 &&
					validated &&
					value.length === maxLength
				) {
					// Check if the key is a character
					e.preventDefault(); // Prevent the default behavior

					const newValue =
						value.slice(0, cursorPosition - 1) +
						key +
						value.slice(cursorPosition);

					setOtpValue(newValue.slice(0, maxLength));

					// Update the cursor position
					setCursorPosition(cursorPosition);

					if (onChange) {
						onChange(newValue);
					}

					// Move the cursor position in the input field
					requestAnimationFrame(() => {
						input.selectionStart = cursorPosition;
						input.selectionEnd = cursorPosition;
					});
				}
			},
			[cursorPosition, filter, maxLength, onChange],
		);

		const inputMode = React.useMemo(() => {
			if (type !== "numeric") return "text";
			return "numeric";
		}, [type]);

		const contextValue = React.useMemo(
			() => ({
				maxLength,
				value: value ?? otpValue,
				cursorPosition,
				isFocused: isOtpFocused,
				type,
			}),
			[maxLength, value, otpValue, cursorPosition, isOtpFocused, type],
		);

		return (
			<OtpFieldContext.Provider value={contextValue}>
				<_OtpField
					value={value ?? otpValue}
					inputMode={inputMode}
					onChange={handleChange}
					onSelect={handleSelect}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					maxLength={maxLength}
					className={cn("group flex flex-col gap-2", className)}
					autoComplete="one-time-code"
					ref={ref}
					{...props}
				>
					{children}
				</_OtpField>
			</OtpFieldContext.Provider>
		);
	},
);
OtpField.displayName = "OptField";

const OtpFieldGroup = BorderGroup;

const OtpFieldGroupRoot = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
	const context = React.useContext(OtpFieldContext);

	if (!context) {
		throw new Error("OtpFieldInput must be used within a OtpField");
	}

	return (
		<div ref={ref} className={cn("relative", className)} {...props}>
			{children}

			<Input
				className="pointer-events-auto absolute inset-0 top-0 h-full w-full text-left font-mono leading-none tracking-[-0.5em] opacity-0 shadow-none outline-0 [clip-path:inset(0px_40px_0px_0px)] [font-variant-numeric:tabular-nums]"
				maxLength={context.maxLength}
			/>
		</div>
	);
});
OtpFieldGroupRoot.displayName = "OtpFieldGroupRoot";

const OtpFieldInput = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		index: number;
	}
>(({ className, index, ...props }, ref) => {
	const context = React.useContext(OtpFieldContext);

	if (!context) {
		throw new Error("OtpFieldInput must be used within a OtpField");
	}

	if (index + 1 > context.maxLength!) throw Error("more than maxlength!");

	const currentOtpChar = React.useMemo(() => {
		const value = context.value[index];
		return value ?? "";
	}, [context.value, index]);

	const showCaret = React.useMemo(() => {
		const hasValue = currentOtpChar.length > 0;

		return (
			context.cursorPosition === index && context.isFocused && !hasValue
		);
	}, [
		context.cursorPosition,
		context.isFocused,
		currentOtpChar.length,
		index,
	]);

	const showFocus = React.useMemo(() => {
		if (context.cursorPosition < context.value.length) {
			console.log("true");
			return context.cursorPosition - 1 === index && context.isFocused;
		}
		console.log("false");

		return context.cursorPosition === index && context.isFocused;
	}, [
		context.cursorPosition,
		context.isFocused,
		context.value.length,
		index,
	]);

	const isLast = React.useMemo(() => {
		return (
			context.isFocused &&
			context.cursorPosition === context.maxLength! &&
			index + 1 === context.maxLength
		);
	}, [context.cursorPosition, context.isFocused, context.maxLength, index]);

	return (
		<div
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 items-center justify-center border border-input text-sm transition-all",
				showFocus && "outline-none ring-2 ring-ring ring-offset-2",
				isLast && "outline-none ring-2 ring-ring ring-offset-2",
				className,
			)}
			data-index={index}
			{...props}
		>
			{currentOtpChar}
			{showCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
				</div>
			)}
		</div>
	);
});
OtpFieldInput.displayName = "OtpFieldInput";

export {
	OtpField,
	OtpFieldGroupRoot,
	OtpFieldGroup,
	OtpFieldInput,
	type OtpFieldProps,
};
