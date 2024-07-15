import { Button } from "@/registry/ui/button";
import {
	CalendarGrid,
	CalendarGridBody,
	CalendarGridBodyCell,
	CalendarGridHeader,
	CalendarGridHeaderCell,
	CalendarHeader,
	CalendarHeading,
	CalendarNextButton,
	CalendarPreviousButton,
	RangeCalendar,
} from "@/registry/ui/calendar";
import {
	DatePickerDialog,
	DatePickerPopover,
	DateRangePicker,
	DateRangePickerButton,
} from "@/registry/ui/date-picker";
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
		.custom<{ start: DateValue; end: DateValue }>()
		.nullish()
		.refine((date) => date, { message: "Please enter valid date range" }),
});

export default function DatePickerRangeWithFormDemo() {
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
				className="w-full max-w-[300px] space-y-8"
			>
				<FormField
					control={form.control}
					name="date"
					render={({ field, fieldState }) => (
						<FormItem>
							<DateRangePicker
								{...field}
								isDisabled={field.disabled}
								isInvalid={fieldState.invalid}
							>
								{(date) => (
									<>
										<FormLabel>Date</FormLabel>
										<FormControl>
											<DateRangePickerButton {...date} />
											<DatePickerPopover>
												<DatePickerDialog>
													<div className="w-fit rounded-md border p-4">
														<RangeCalendar>
															<CalendarHeader>
																<CalendarPreviousButton
																	iconOnly
																/>
																<CalendarHeading />
																<CalendarNextButton
																	iconOnly
																/>
															</CalendarHeader>

															<div className="flex flex-col gap-4 md:flex-row">
																<CalendarGrid>
																	<CalendarGridHeader>
																		{(
																			day,
																		) => (
																			<CalendarGridHeaderCell>
																				{
																					day
																				}
																			</CalendarGridHeaderCell>
																		)}
																	</CalendarGridHeader>
																	<CalendarGridBody>
																		{(
																			date,
																		) => (
																			<>
																				<CalendarGridBodyCell
																					date={
																						date
																					}
																				/>
																			</>
																		)}
																	</CalendarGridBody>
																</CalendarGrid>
															</div>
														</RangeCalendar>
													</div>
												</DatePickerDialog>
											</DatePickerPopover>
										</FormControl>
										<FormDescription>
											Date of your choice
										</FormDescription>
										<FormMessage />
									</>
								)}
							</DateRangePicker>
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
