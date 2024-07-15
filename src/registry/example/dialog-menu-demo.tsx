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
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/registry/ui/menu";
import { Trash } from "lucide-react";
import * as React from "react";

export default function DialogMenuDemo() {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<>
			<MenuTrigger>
				<Button variant="outline">More</Button>
				<MenuPopover placement="top" className="min-w-[8rem]">
					<Menu className="w-56">
						<MenuItem onAction={() => setIsOpen(true)}>
							<Trash className="mr-2 h-4 w-4" />
							<span>Delete Item</span>
						</MenuItem>
					</Menu>
				</MenuPopover>
			</MenuTrigger>
			<DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
				<DialogOverlay isDismissable={false}>
					<DialogContent
						role="alertdialog"
						className="sm:max-w-[425px]"
						closeButton={false}
					>
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
								<DialogFooter className="pt-4">
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
		</>
	);
}
