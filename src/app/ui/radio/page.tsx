import Preview from "@/components/preview";
import { Label } from "@/registry/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export default function RadioPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<RadioGroup>
					<Label>Favorite pet</Label>
					<RadioGroupItem value="dogs">Dog</RadioGroupItem>
					<RadioGroupItem value="cats">Cat</RadioGroupItem>
					<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
				</RadioGroup>
			</Preview>
			<Preview>
				<RadioGroup isInvalid>
					<Label>Favorite pet</Label>
					<RadioGroupItem value="dogs">Dog</RadioGroupItem>
					<RadioGroupItem value="cats">Cat</RadioGroupItem>
					<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
				</RadioGroup>
			</Preview>
			<Preview>
				<RadioGroup isDisabled>
					<Label>Favorite pet</Label>
					<RadioGroupItem value="dogs">Dog</RadioGroupItem>
					<RadioGroupItem value="cats">Cat</RadioGroupItem>
					<RadioGroupItem value="dragon">Dragon</RadioGroupItem>
				</RadioGroup>
			</Preview>
		</div>
	);
}
