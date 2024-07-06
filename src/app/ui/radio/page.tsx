import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioPage() {
	return (
		<div className="grid gap-4">
			<RadioGroup>
				<Label>Favorite pet</Label>
				<RadioGroupItem value="dogs">Dog</RadioGroupItem>
				<RadioGroupItem value="cats">Cat</RadioGroupItem>
				<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
			</RadioGroup>
			<RadioGroup isInvalid>
				<Label>Favorite pet</Label>
				<RadioGroupItem value="dogs">Dog</RadioGroupItem>
				<RadioGroupItem value="cats">Cat</RadioGroupItem>
				<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
			</RadioGroup>
			<RadioGroup isDisabled>
				<Label>Favorite pet</Label>
				<RadioGroupItem value="dogs">Dog</RadioGroupItem>
				<RadioGroupItem value="cats">Cat</RadioGroupItem>
				<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
			</RadioGroup>
		</div>
	);
}
