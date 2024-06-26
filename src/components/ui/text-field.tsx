"use client";
import * as React from "react";

import {
	TextField as _TextField,
	type TextFieldProps as _TextFieldProps,
} from "react-aria-components";

interface TextFieldProps extends _TextFieldProps {}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	(props, ref) => {
		return (
			<_TextField
				className="group flex flex-col gap-2"
				ref={ref}
				{...props}
			/>
		);
	},
);
TextField.displayName = "TextField";

export { TextField, type TextFieldProps };
