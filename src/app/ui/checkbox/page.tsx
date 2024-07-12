import Preview from "@/components/preview";
import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import { Label } from "@/registry/ui/label";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<div className="grid w-full max-w-lg gap-4">
					<Checkbox>Subscribe</Checkbox>
					<Checkbox defaultSelected>Default Subscribe</Checkbox>
					<Checkbox isIndeterminate>Indeterminate</Checkbox>
					<Checkbox isDisabled>Disabled</Checkbox>
					<Checkbox isInvalid>Invalid</Checkbox>
					<Checkbox id="terms1" className="items-start">
						<div className="grid gap-1.5 leading-none">
							Accept terms and conditions
							<p className="text-sm text-muted-foreground">
								You agree to our Terms of Service and Privacy
								Policy.
							</p>
						</div>
					</Checkbox>
				</div>
			</Preview>

			<Preview>
				<CheckboxGroup className="w-full max-w-lg">
					<Label>Favorite sports</Label>
					<Checkbox value="soccer">Soccer</Checkbox>
					<Checkbox value="baseball">Baseball</Checkbox>
					<Checkbox value="basketball">Basketball</Checkbox>
				</CheckboxGroup>
			</Preview>

			<Preview>
				<CheckboxGroup className="w-full max-w-lg" isInvalid>
					<Label>Favorite sports</Label>
					<Checkbox value="soccer">Soccer</Checkbox>
					<Checkbox value="baseball">Baseball</Checkbox>
					<Checkbox value="basketball">Basketball</Checkbox>
				</CheckboxGroup>
			</Preview>

			<Preview>
				<CheckboxGroup className="w-full max-w-lg" isDisabled>
					<Label>Favorite sports</Label>
					<Checkbox value="soccer">Soccer</Checkbox>
					<Checkbox value="baseball">Baseball</Checkbox>
					<Checkbox value="basketball">Basketball</Checkbox>
				</CheckboxGroup>
			</Preview>
		</div>
	);
}
