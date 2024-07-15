import { Button } from "@/registry/ui/button";
import {
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerTitle,
	DrawerTrigger,
} from "@/registry/ui/drawer";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import * as React from "react";

export default function DrawerDemo() {
	return (
		<DrawerTrigger>
			<Button variant="outline">Drawer</Button>
			<DrawerOverlay>
				<DrawerContent>
					<div className="mx-auto max-w-[425px]">
						<DrawerHeader>
							<DrawerTitle>Edit profile</DrawerTitle>
							<DrawerDescription>
								Make changes to your profile here. Click save
								when you&apos;re done.
							</DrawerDescription>
						</DrawerHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									defaultValue="Mine UI"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-right"
								>
									Username
								</Label>
								<Input
									id="username"
									defaultValue="@mine_ui"
									className="col-span-3"
								/>
							</div>
						</div>
						<DrawerFooter>
							<Button type="submit">Save changes</Button>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</DrawerOverlay>
		</DrawerTrigger>
	);
}
