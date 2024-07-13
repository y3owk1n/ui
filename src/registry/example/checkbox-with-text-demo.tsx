import { Checkbox } from "@/registry/ui/checkbox";

export default function CheckboxWithTextDemo() {
	return (
		<Checkbox className="items-start rounded-md border p-4">
			<div className="-mt-0.5 grid gap-1.5">
				<span className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					Accept terms and conditions
				</span>
				<span className="text-sm text-muted-foreground">
					You agree to our Terms of Service and Privacy Policy.
				</span>
			</div>
		</Checkbox>
	);
}
