import { FieldDescription } from "@/registry/ui/field-description";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { TextField } from "@/registry/ui/text-field";
import * as React from "react";

export default function FieldDescriptionDemo() {
	return (
		<TextField className="w-full max-w-[200px]">
			<Label>Email</Label>
			<Input type="email" placeholder="Email..." />
			<FieldDescription>This is your public email</FieldDescription>
		</TextField>
	);
}
