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
import * as React from "react";

export default function DialogAlertDemo() {
	return (
		<DialogTrigger>
			<Button variant="destructive">Delete</Button>
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
									permanently delete your account and remove
									your data from our servers.
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
								<Button variant="destructive" onPress={close}>
									Continue
								</Button>
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</DialogOverlay>
		</DialogTrigger>
	);
}
