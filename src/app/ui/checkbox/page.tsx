import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Label } from "@/components/ui/label";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<Checkbox>Subscribe</Checkbox>
			<Checkbox defaultSelected>Default Subscribe</Checkbox>
			<Checkbox isIndeterminate>Indeterminate</Checkbox>
			<Checkbox isDisabled>Disabled</Checkbox>
			<Checkbox isInvalid>Invalid</Checkbox>
			<Checkbox id="terms1" className="items-start">
				<div className="grid gap-1.5 leading-none">
					Accept terms and conditions
					<p className="text-sm text-muted-foreground">
						You agree to our Terms of Service and Privacy Policy.
					</p>
				</div>
			</Checkbox>

			<CheckboxGroup>
				<Label>Favorite sports</Label>
				<Checkbox value="soccer">Soccer</Checkbox>
				<Checkbox value="baseball">Baseball</Checkbox>
				<Checkbox value="basketball">Basketball</Checkbox>
			</CheckboxGroup>
		</div>
	);
}
