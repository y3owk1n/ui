import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxPage() {
	return (
		<div className="">
			<Checkbox>Subscribe</Checkbox>
			<Checkbox defaultSelected>Default Subscribe</Checkbox>
			<Checkbox isIndeterminate>Indeterminate</Checkbox>
			<Checkbox isDisabled>Disabled</Checkbox>
			<Checkbox isInvalid>Invalid</Checkbox>
		</div>
	);
}
