import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckboxPage() {
	return (
		<div className="">
			<RadioGroup>
				<Label>Favorite pet</Label>
				<RadioGroupItem value="dogs">Dog</RadioGroupItem>
				<RadioGroupItem value="cats">Cat</RadioGroupItem>
				<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
			</RadioGroup>
		</div>
	);
}
