import { Button } from "@/registry/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import * as React from "react";

export default function DialogDemo() {
	return (
		<DialogTrigger>
			<Button variant="outline">Sign Up</Button>
			<DialogOverlay>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Sign Up</DialogTitle>
						<DialogDescription>
							Register now to continue.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Username
							</Label>
							<Input
								id="username"
								placeholder="joshua39"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="***************"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Sign Up</Button>
					</DialogFooter>
				</DialogContent>
			</DialogOverlay>
		</DialogTrigger>
	);
}
