"use client";

import { Button } from "@/components/ui/button";
import {
	Calendar,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridBodyCell,
	CalendarGridHeader,
	CalendarGridHeaderCell,
	CalendarHeader,
	CalendarHeading,
	CalendarNextButton,
	CalendarPreviousButton,
} from "@/components/ui/calendar";
import { DateField, DateInput, DateSegment } from "@/components/ui/date-field";
import {
	DatePicker,
	DatePickerButton,
	DatePickerDialog,
	DatePickerPopover,
} from "@/components/ui/date-picker";
import { FieldDescription } from "@/components/ui/field-description";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/ui/text-field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type DateValue,
	getLocalTimeZone,
	today,
} from "@internationalized/date";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	username: z.string().min(2).max(50),
	email: z.string().email(),
	date: z
		.custom<DateValue>()
		.nullish()
		.refine(
			(date) => {
				if (!date) return false;
				const isInvalid = today(getLocalTimeZone()).compare(date) > 7;

				return isInvalid;
			},
			{ message: "Please enter valid date" },
		),
	datePick: z
		.custom<DateValue>()
		.nullish()
		.refine(
			(date) => {
				if (!date) return false;
				const isInvalid = today(getLocalTimeZone()).compare(date) > 7;

				return isInvalid;
			},
			{ message: "Please enter valid date Pick" },
		),
});

export default function CheckboxPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			date: null,
			datePick: null,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="grid gap-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field, fieldState }) => (
							<FormItem>
								<TextField
									{...field}
									isDisabled={field.disabled}
									isInvalid={fieldState.invalid}
								>
									<FormLabel>Username</FormLabel>

									<FormControl>
										<Input placeholder="shadcn" />
									</FormControl>
									<FieldDescription>
										This is your public display name.
									</FieldDescription>
									<FormMessage />
								</TextField>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field, fieldState }) => (
							<FormItem>
								<TextField
									{...field}
									isDisabled={field.disabled}
									isInvalid={fieldState.invalid}
								>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="shadcn"
										/>
									</FormControl>
									<FieldDescription>
										Your Email
									</FieldDescription>
									<FormMessage />
								</TextField>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date"
						render={({ field, fieldState }) => (
							<FormItem>
								<DateField
									{...field}
									isDisabled={field.disabled}
									isInvalid={fieldState.invalid}
								>
									<FormLabel>Date</FormLabel>
									<FormControl>
										<DateInput>
											{(segment) => (
												<DateSegment
													segment={segment}
												/>
											)}
										</DateInput>
									</FormControl>
									<FieldDescription>
										Date of your choice
									</FieldDescription>
									<FormMessage />
								</DateField>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="datePick"
						render={({ field, fieldState }) => (
							<FormItem>
								<DatePicker
									{...field}
									isDisabled={field.disabled}
									isInvalid={fieldState.invalid}
								>
									{(date) => (
										<>
											<FormLabel>Date Picker</FormLabel>
											<FormControl>
												<DatePickerButton {...date} />
												<DatePickerPopover>
													<DatePickerDialog>
														<div className="w-fit rounded-md border p-4">
															<Calendar>
																<CalendarHeader>
																	<CalendarPreviousButton
																		iconOnly
																	/>
																	<CalendarHeading />
																	<CalendarNextButton
																		iconOnly
																	/>
																</CalendarHeader>

																<div className="flex gap-4">
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
															</Calendar>
														</div>
													</DatePickerDialog>
												</DatePickerPopover>
											</FormControl>
											<FieldDescription>
												Date of your choice
											</FieldDescription>
											<FormMessage />
										</>
									)}
								</DatePicker>
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
