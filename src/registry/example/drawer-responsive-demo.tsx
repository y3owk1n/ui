import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { ResponsiveDialogDrawer } from "@/registry/ui/responsive-dialog-drawer";
import * as React from "react";

export default function DrawerResponsiveDemo() {
	return (
		<ResponsiveDialogDrawer
			title="Responsive Dialog"
			description="Resize and see the magic"
			buttonText="Responsive"
			buttonStyle="outline"
		>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input
						id="name"
						defaultValue="MineUI"
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right">
						Username
					</Label>
					<Input
						id="username"
						defaultValue="@mine_ui"
						className="col-span-3"
					/>
				</div>
			</div>
		</ResponsiveDialogDrawer>
	);
}
