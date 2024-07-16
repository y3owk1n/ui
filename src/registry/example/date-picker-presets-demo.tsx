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
import {
	DatePicker,
	DatePickerButton,
	DatePickerDialog,
	DatePickerPopover,
	DatePickerPreset,
	DatePickerPresetButton,
} from "@/registry/ui/date-picker";
import { Label } from "@/registry/ui/label";
import { getLocalTimeZone, today } from "@internationalized/date";
import * as React from "react";

export default function DatePickerPresetsDemo() {
	const [selectedDate, setSelectedDate] = React.useState(
		today(getLocalTimeZone()),
	);

	const [focusedDate, setFocusedDate] = React.useState(selectedDate);

	return (
		<DatePicker
			value={selectedDate}
			onChange={setSelectedDate}
			className="w-full max-w-[300px]"
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
										<CalendarPreviousButton iconOnly />
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
	);
}
