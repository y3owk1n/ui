"use client";
import Preview from "@/components/preview";
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
	DatePickerPreset,
	DatePickerPresetButton,
	DateRangePicker,
	DateRangePickerButton,
} from "@/registry/ui/date-picker";
import { Label } from "@/registry/ui/label";
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import { useState } from "react";
import { FieldError, useLocale } from "react-aria-components";

export default function DateRangePickerPage() {
	const { locale } = useLocale();
	const [selectedRange, setSelectedRange] = useState({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ weeks: 1, days: 3 }),
	});

	const isInvalid = selectedRange.end.compare(selectedRange.start) > 7;

	return (
		<div className="grid gap-4">
			<Preview>
				<DateRangePicker
					isInvalid={isInvalid}
					value={selectedRange}
					onChange={setSelectedRange}
					isDateUnavailable={(date) => isWeekend(date, locale)}
					allowsNonContiguousRanges
				>
					{(date) => (
						<>
							<Label>Date Range Picker</Label>
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
															setSelectedRange({
																start: today(
																	getLocalTimeZone(),
																),
																end: today(
																	getLocalTimeZone(),
																).add({
																	days: 3,
																}),
															});
														}}
													>
														Next 3 Days
													</DatePickerPresetButton>
													<DatePickerPresetButton
														onPress={() => {
															setSelectedRange({
																start: today(
																	getLocalTimeZone(),
																),
																end: today(
																	getLocalTimeZone(),
																).add({
																	days: 7,
																}),
															});
														}}
													>
														Next 7 Days
													</DatePickerPresetButton>
													<DatePickerPresetButton
														onPress={() => {
															setSelectedRange({
																start: today(
																	getLocalTimeZone(),
																),
																end: today(
																	getLocalTimeZone(),
																).add({
																	days: 30,
																}),
															});
														}}
													>
														Next 30 Days
													</DatePickerPresetButton>
												</DatePickerPreset>
											</div>
										</RangeCalendar>
									</div>
								</DatePickerDialog>
							</DatePickerPopover>
							<FieldError />
						</>
					)}
				</DateRangePicker>
			</Preview>
		</div>
	);
}
