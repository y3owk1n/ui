import { DateField, DateInput, DateSegment } from "@/registry/ui/date-field";
import { FieldDescription } from "@/registry/ui/field-description";
import { FieldError } from "@/registry/ui/field-error";
import { Label } from "@/registry/ui/label";
import * as React from "react";

export default function DateFieldDemo() {
	return (
		<DateField className="w-full max-w-[200px]">
			<Label>Date</Label>
			<DateInput>
				{(segment) => <DateSegment segment={segment} />}
			</DateInput>
			<FieldDescription>Date of your choice</FieldDescription>
			<FieldError />
		</DateField>
	);
}
