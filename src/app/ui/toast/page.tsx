"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Sun } from "lucide-react";

export default function CheckboxPage() {
	const toast = useToast();

	return (
		<div className="flex flex-wrap gap-4">
			<Button
				onPress={() =>
					toast.default("Toast is done!", {
						description: "helloooooooooooooooooooo",
						timeout: 1000,
					})
				}
			>
				Show toast string
			</Button>
			<Button
				onPress={() =>
					toast.default("Toast is done!", {
						description: (
							<span className="inline-flex items-center">
								hmmm...
								<Sun className="ml-2 size-4" />
							</span>
						),
					})
				}
			>
				Custom Children
			</Button>
			<Button
				onPress={() =>
					toast.default("Toast is done!", {
						action: {
							label: "Log this",
							cb: () => console.log("callback !!"),
						},
					})
				}
			>
				With Action
			</Button>
			<Button
				onPress={() =>
					toast.default("Long live toast", {
						description: "Never dismissed!",
						timeout: null,
					})
				}
			>
				No Timeout Dismissable
			</Button>
			<Button
				onPress={() =>
					toast.default("Long live toast", {
						description: "Never dismissed!",
						timeout: null,
						allowDismiss: false,
					})
				}
			>
				No Timeout Non Dismissable
			</Button>
			<Button
				variant="success"
				onPress={() =>
					toast.success("Success!", {
						description: "with title!",
						timeout: 3000,
					})
				}
			>
				Success
			</Button>
			<Button
				variant="info"
				onPress={() =>
					toast.info("Info!", {
						description: "with title!",
						timeout: 3000,
					})
				}
			>
				Info
			</Button>
			<Button
				variant="warning"
				onPress={() =>
					toast.warning("Warning!", {
						description: "with title!",
						timeout: 3000,
					})
				}
			>
				Warning
			</Button>
			<Button
				variant="destructive"
				onPress={() =>
					toast.destructive("Destructive!", {
						description: "with title!",
						timeout: 3000,
					})
				}
			>
				Destructive
			</Button>
		</div>
	);
}
