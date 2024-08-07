"use client";

import Preview from "@/components/preview";
import { Button } from "@/registry/ui/button";
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
} from "@/registry/ui/calendar";
import { DateField, DateInput, DateSegment } from "@/registry/ui/date-field";
import {
	DatePicker,
	DatePickerButton,
	DatePickerDialog,
	DatePickerPopover,
} from "@/registry/ui/date-picker";
import { FieldDescription } from "@/registry/ui/field-description";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form";
import { Input } from "@/registry/ui/input";
import {
	OtpField,
	OtpFieldGroup,
	OtpFieldGroupRoot,
	OtpFieldInput,
} from "@/registry/ui/otp-field";
import { TextField } from "@/registry/ui/text-field";
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
	otp: z.string().length(6),
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

export default function FormPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			date: null,
			datePick: null,
			otp: "38",
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
			<Preview>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-lg space-y-8"
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
							name="otp"
							render={({ field, fieldState }) => (
								<FormItem>
									<OtpField
										type="numeric"
										{...field}
										isDisabled={field.disabled}
										isInvalid={fieldState.invalid}
									>
										<FormLabel>OTP Number</FormLabel>
										<FormControl>
											<OtpFieldGroupRoot>
												<OtpFieldGroup>
													<OtpFieldInput index={0} />
													<OtpFieldInput index={1} />
													<OtpFieldInput index={2} />
													<OtpFieldInput index={3} />
													<OtpFieldInput index={4} />
													<OtpFieldInput index={5} />
												</OtpFieldGroup>
											</OtpFieldGroupRoot>
										</FormControl>
										<FieldDescription>
											Make sure it is correct
										</FieldDescription>
										<FormMessage />
									</OtpField>
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
												<FormLabel>
													Date Picker
												</FormLabel>
												<FormControl>
													<DatePickerButton
														{...date}
													/>
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
			</Preview>
		</div>
	);
}
