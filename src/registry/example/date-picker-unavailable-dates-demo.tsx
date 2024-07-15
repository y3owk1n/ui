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
} from "@/registry/ui/date-picker";
import { Label } from "@/registry/ui/label";
import {
	type DateValue,
	getLocalTimeZone,
	isWeekend,
	today,
} from "@internationalized/date";
import * as React from "react";
import { useLocale } from "react-aria-components";

export default function DatePickerUnavailableDatesDemo() {
	const [selectedDate, setSelectedDate] = React.useState(
		today(getLocalTimeZone()),
	);
	const { locale } = useLocale();
	// const isDateUnavailable = isWeekend(selectedDate, locale);

	function isDateUnavailable(date: DateValue) {
		return isWeekend(date, locale);
	}

	return (
		<DatePicker
			isDateUnavailable={isDateUnavailable}
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
								<Calendar>
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
