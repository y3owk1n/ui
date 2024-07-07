"use client";
import Preview from "@/components/preview";
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
import {
	DatePicker,
	DatePickerButton,
	DatePickerDialog,
	DatePickerPopover,
	DatePickerPreset,
	DatePickerPresetButton,
} from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";

export default function DatePickerPage() {
	const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));

	const [focusedDate, setFocusedDate] = useState(selectedDate);
	const { locale } = useLocale();
	const isInvalid = isWeekend(selectedDate, locale);

	return (
		<div className="grid gap-4">
			<Preview>
				<DatePicker
					isInvalid={isInvalid}
					value={selectedDate}
					onChange={setSelectedDate}
				>
					{(date) => (
						<>
							<Label>Date Picker</Label>
							<DatePickerButton {...date} />
							<DatePickerPopover>
								<DatePickerDialog>
									<div className="w-fit rounded-md border p-4">
										<Calendar
											focusedValue={focusedDate}
											onFocusChange={setFocusedDate}
										>
											<CalendarHeader>
												<CalendarPreviousButton
													iconOnly
												/>
												<CalendarHeading />
												<CalendarNextButton iconOnly />
											</CalendarHeader>

											<div className="flex flex-col gap-4 md:flex-row">
												<CalendarGrid>
													<CalendarGridHeader>
														{(day) => (
															<CalendarGridHeaderCell>
																{day}
															</CalendarGridHeaderCell>
														)}
													</CalendarGridHeader>
													<CalendarGridBody>
														{(date) => (
															<>
																<CalendarGridBodyCell
																	date={date}
																/>
															</>
														)}
													</CalendarGridBody>
												</CalendarGrid>

												<DatePickerPreset>
													<DatePickerPresetButton
														onPress={() => {
															setSelectedDate(
																today(
																	getLocalTimeZone(),
																),
															);
															setFocusedDate(
																today(
																	getLocalTimeZone(),
																),
															);
														}}
													>
														Today
													</DatePickerPresetButton>
													<DatePickerPresetButton
														onPress={() => {
															setSelectedDate(
																today(
																	getLocalTimeZone(),
																).add({
																	days: 1,
																}),
															);
															setFocusedDate(
																today(
																	getLocalTimeZone(),
																).add({
																	days: 1,
																}),
															);
														}}
													>
														Tomorrow
													</DatePickerPresetButton>
													<DatePickerPresetButton
														onPress={() => {
															setSelectedDate(
																today(
																	getLocalTimeZone(),
																).add({
																	days: 3,
																}),
															);
															setFocusedDate(
																today(
																	getLocalTimeZone(),
																).add({
																	days: 3,
																}),
															);
														}}
													>
														Next 3 days
													</DatePickerPresetButton>
													<DatePickerPresetButton
														onPress={() => {
															setSelectedDate(
																today(
																	getLocalTimeZone(),
																).add({
																	days: 7,
																}),
															);
															setFocusedDate(
																today(
																	getLocalTimeZone(),
																).add({
																	days: 7,
																}),
															);
														}}
													>
														In a week
													</DatePickerPresetButton>
												</DatePickerPreset>
											</div>
										</Calendar>
									</div>
								</DatePickerDialog>
							</DatePickerPopover>
						</>
					)}
				</DatePicker>
			</Preview>
		</div>
	);
}
