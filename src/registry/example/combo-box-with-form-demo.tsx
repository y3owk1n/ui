import { Button } from "@/registry/ui/button";
import {
	ComboBox,
	ComboBoxContent,
	ComboBoxItem,
	ComboBoxPopover,
	ComboBoxTrigger,
} from "@/registry/ui/combo-box";
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
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const rows = [
	{ id: 1, name: "Chocolate" },
	{ id: 2, name: "Mint" },
	{ id: 3, name: "Strawberry" },
	{ id: 4, name: "Vanilla" },
];

const enumMap = rows.map((item) => item.name) as [string, ...string[]];

const FormSchema = z.object({
	// item: z.enum(enumMap),
	item: z.enum(enumMap),
});

export default function ComboBoxDemo() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			item: "",
		},
	});

	const toast = useToast();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md p-4">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="item"
					render={({ field, fieldState }) => (
						<FormItem>
							<ComboBox
								aria-label="select item"
								className="max-w-[200px]"
								{...field}
								onSelectionChange={(e) => {
									const selectedText = rows.find(
										(item) => item.id === e,
									)?.name;
									field.onChange(selectedText ?? "");
								}}
								defaultItems={rows}
								isDisabled={field.disabled}
								isInvalid={fieldState.invalid}
							>
								<FormLabel>Select a flavour</FormLabel>
								<FormDescription>
									Which flavour would you like to have today?
								</FormDescription>

								<FormControl>
									<ComboBoxTrigger placeholder="Select something" />
									<ComboBoxPopover>
										<ComboBoxContent<(typeof rows)[number]>>
											{(item) => (
												<ComboBoxItem
													textValue={item.name}
												>
													{item.name}
												</ComboBoxItem>
											)}
										</ComboBoxContent>
									</ComboBoxPopover>
								</FormControl>

								<FormMessage />
							</ComboBox>
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
