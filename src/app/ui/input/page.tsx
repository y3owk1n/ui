import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/ui/textfield";

export default function CheckboxPage() {
	return (
		<div className="">
			<TextField>
				<Label>Email</Label>
				<Input type="email" placeholder="Email..." />
			</TextField>
		</div>
	);
}
