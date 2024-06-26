"use client";
import { Button } from "@/components/ui/button";
import {
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialogDrawer } from "@/components/ui/responsive-dialog-drawer";

export default function CheckboxPage() {
	return (
		<div className="flex flex-wrap gap-4">
			<DrawerTrigger>
				<Button variant="outline">Drawer</Button>
				<DrawerOverlay>
					<DrawerContent>
						<div className="mx-auto max-w-[425px]">
							<DrawerHeader>
								<DrawerTitle>Edit profile</DrawerTitle>
								<DrawerDescription>
									Make changes to your profile here. Click
									save when you&apos;re done.
								</DrawerDescription>
							</DrawerHeader>
							<Content />
							<DrawerFooter>
								<Button type="submit">Save changes</Button>
							</DrawerFooter>
						</div>
					</DrawerContent>
				</DrawerOverlay>
			</DrawerTrigger>

			<ResponsiveDialogDrawer
				title="Responsive Dialog"
				description="Resize and see the magic"
				buttonText="Responsive"
				buttonStyle="outline"
			>
				<Content />
			</ResponsiveDialogDrawer>
		</div>
	);
}

function Content() {
	return (
		<div className="grid gap-4 py-4">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="name" className="text-right">
					Name
				</Label>
				<Input
					id="name"
					defaultValue="Pedro Duarte"
					className="col-span-3"
				/>
			</div>
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="username" className="text-right">
					Username
				</Label>
				<Input
					id="username"
					defaultValue="@peduarte"
					className="col-span-3"
				/>
			</div>
		</div>
	);
}
