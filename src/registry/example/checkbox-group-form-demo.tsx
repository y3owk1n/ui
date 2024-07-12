"use client";

import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { CheckboxGroup } from "@/registry/ui/checkbox-group";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form";
import { useToast } from "@/registry/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const items = [
	{
		id: "recents",
		label: "Recents",
	},
	{
		id: "home",
		label: "Home",
	},
	{
		id: "applications",
		label: "Applications",
	},
	{
		id: "desktop",
		label: "Desktop",
	},
	{
		id: "downloads",
		label: "Downloads",
	},
	{
		id: "documents",
		label: "Documents",
	},
] as const;

const FormSchema = z.object({
	items: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});

export default function CheckboxGroupDemo() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: ["recents", "home"],
		},
	});

	const toast = useToast();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="items"
					render={({ field, fieldState }) => (
						<FormItem>
							<CheckboxGroup
								{...field}
								isDisabled={field.disabled}
								isInvalid={fieldState.invalid}
							>
								<FormLabel>Sidebar</FormLabel>
								<FormDescription>
									Select the items you want to display in the
									sidebar.
								</FormDescription>

								<FormControl className="grid gap-1">
									{items.map((item) => (
										<Checkbox key={item.id} value={item.id}>
											{item.label}
										</Checkbox>
									))}
								</FormControl>

								<FormMessage />
							</CheckboxGroup>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
