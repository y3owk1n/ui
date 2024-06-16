import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<TextField>
				<Label>Email</Label>
				<Input type="email" placeholder="Email..." />
			</TextField>
			<TextField>
				<Label>Remarks</Label>
				<TextArea rows={5} placeholder="Write something here..." />
			</TextField>
		</div>
	);
}
