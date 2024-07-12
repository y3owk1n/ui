import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import { FieldError } from "@/registry/ui/field-error";
import { Label } from "@/registry/ui/label";

export default function CheckboxGroupInvalidDemo() {
	return (
		<CheckboxGroup isInvalid>
			<Label>Favorite sports</Label>
			<Checkbox value="soccer">Soccer</Checkbox>
			<Checkbox value="baseball">Baseball</Checkbox>
			<Checkbox value="basketball">Basketball</Checkbox>
			<FieldError />
		</CheckboxGroup>
	);
}
