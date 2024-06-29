"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	TextField as _PasswordField,
	Group,
	type TextFieldProps as _PasswordFieldProps,
} from "react-aria-components";
import { Input, type InputProps } from "./input";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps extends _PasswordFieldProps {}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
	({ className, ...props }, ref) => {
		return (
			<_PasswordField
				className={cn("group flex flex-col gap-2", className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
PasswordField.displayName = "PasswordField";

const PasswordFieldInput = React.forwardRef<
	HTMLInputElement,
	Omit<InputProps, "type">
>(({ className, placeholder, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const handleToggleShowPassword = React.useCallback(() => {
		setShowPassword((prev) => !prev);
	}, []);

	return (
		<Group className="relative">
			<Input
				placeholder={placeholder ?? "***********"}
				type={showPassword ? "text" : "password"}
				className={(values) =>
					cn(
						"pr-10",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			/>

			<div className="absolute right-0 top-0 h-10">
				<Button
					onPress={handleToggleShowPassword}
					variant="unstyled"
					size="icon"
				>
					{showPassword ? (
						<EyeOff className="size-4" />
					) : (
						<Eye className="size-4" />
					)}
				</Button>
			</div>
		</Group>
	);
});
PasswordFieldInput.displayName = "PasswordFieldInput";

export { PasswordField, PasswordFieldInput, type PasswordFieldProps };
