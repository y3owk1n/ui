import { FieldError } from "@/components/ui/field-error";
import { FieldDescription } from "@/registry/ui/field-description";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { TextField } from "@/registry/ui/text-field";
import * as React from "react";

export default function FieldErrorDemo() {
	return (
		<TextField className="w-full max-w-[200px]" isInvalid isReadOnly>
			<Label>Email</Label>
			<Input type="email" placeholder="Email..." value="test@test.com" />
			<FieldDescription>This is your public email</FieldDescription>
			<FieldError>Not allowed for this domain</FieldError>
		</TextField>
	);
}
