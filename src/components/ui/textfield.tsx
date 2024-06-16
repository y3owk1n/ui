"use client";
import * as React from "react";

import {
	TextField as _TextField,
	type TextFieldProps as _TextFieldProps,
} from "react-aria-components";

export interface TextFieldProps extends _TextFieldProps {}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	(props, ref) => {
		return <_TextField ref={ref} {...props} />;
	},
);
TextField.displayName = TextField.name;

export { TextField };
