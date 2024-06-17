"use client";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveDialogDrawer } from "@/components/ui/responsive-dialog-drawer";

export default function CheckboxPage() {
	return (
		<div className="flex flex-wrap gap-4">
			<DialogTrigger>
				<Button variant="outline">Normal Dialog</Button>
				<DialogOverlay>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save
								when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<Content />
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
			<DialogTrigger>
				<Button variant="outline">Alert Dialog</Button>
				<DialogOverlay isDismissable={false}>
					<DialogContent role="alertdialog" closeButton={false}>
						{({ close }) => (
							<>
								<DialogHeader>
									<DialogTitle>
										Are you absolutely sure?
									</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will
										permanently delete your account and
										remove your data from our servers.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button
										variant="outline"
										autoFocus
										onPress={close}
										className="mt-2 sm:mt-0"
									>
										Cancel
									</Button>
									<Button
										variant="destructive"
										onPress={close}
									>
										Continue
									</Button>
								</DialogFooter>
							</>
						)}
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
			<DialogTrigger>
				<Button variant="outline">Sheet</Button>
				<DialogOverlay>
					<DialogContent side="right" className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save
								when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<Content />
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
			<DrawerTrigger>
				<Button variant="outline">Drawer</Button>
				<DrawerOverlay>
					<DrawerContent>
						<div className="mx-auto max-w-[425px]">
							<DrawerHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click
									save when you&apos;re done.
								</DialogDescription>
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
