"use client";
import * as React from "react";

import {
	type TimeValue,
	TimeField as _TimeField,
	type TimeFieldProps as _TimeFieldProps,
} from "react-aria-components";
import { DateInput, DateSegment } from "./date-field";

interface TimeFieldProps<T extends TimeValue> extends _TimeFieldProps<T> {}

function TimeField<T extends TimeValue>(props: TimeFieldProps<T>) {
	return <_TimeField className="group flex flex-col gap-2" {...props} />;
}

const TimeInput = DateInput;

const TimeSegment = DateSegment;

export { TimeField, TimeInput, TimeSegment, type TimeFieldProps };
