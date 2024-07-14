import { Button } from "@/registry/ui/button";
import { DateField, DateInput, DateSegment } from "@/registry/ui/date-field";
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
import { type DateValue } from "@internationalized/date";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
	date: z
		.custom<DateValue>()
		.refine((date) => date, { message: "Please enter valid date" }),
});

export default function DateFieldWithFormDemo() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-[200px] space-y-8"
			>
				<FormField
					control={form.control}
					name="date"
					render={({ field, fieldState }) => (
						<FormItem>
							<DateField
								className="max-w-[200px]"
								{...field}
								isDisabled={field.disabled}
								isInvalid={fieldState.invalid}
							>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<DateInput>
										{(segment) => (
											<DateSegment segment={segment} />
										)}
									</DateInput>
								</FormControl>
								<FormDescription>
									Date of your choice
								</FormDescription>
								<FormMessage />
							</DateField>
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
