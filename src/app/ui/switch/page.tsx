import Preview from "@/components/preview";
import { Switch } from "@/components/ui/switch";

export default function SwitchPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Switch>Airplane Mode</Switch>
			</Preview>
		</div>
	);
}
