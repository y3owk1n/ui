"use client";
import { Button } from "@/components/ui/button";
import {
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckboxPage() {
	return (
		<div className="flex flex-wrap gap-4">
			<SheetTrigger>
				<Button variant="outline">Sheet (Left)</Button>
				<SheetOverlay>
					<SheetContent side="left" className="sm:max-w-[425px]">
						<SheetHeader>
							<SheetTitle>Edit profile</SheetTitle>
							<SheetDescription>
								Make changes to your profile here. Click save
								when you&apos;re done.
							</SheetDescription>
						</SheetHeader>
						<Content />
						<SheetFooter>
							<Button type="submit">Save changes</Button>
						</SheetFooter>
					</SheetContent>
				</SheetOverlay>
			</SheetTrigger>
			<SheetTrigger>
				<Button variant="outline">Sheet (Right)</Button>
				<SheetOverlay>
					<SheetContent side="right" className="sm:max-w-[425px]">
						<SheetHeader>
							<SheetTitle>Edit profile</SheetTitle>
							<SheetDescription>
								Make changes to your profile here. Click save
								when you&apos;re done.
							</SheetDescription>
						</SheetHeader>
						<Content />
						<SheetFooter>
							<Button type="submit">Save changes</Button>
						</SheetFooter>
					</SheetContent>
				</SheetOverlay>
			</SheetTrigger>
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
