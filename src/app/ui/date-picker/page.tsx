"use client";
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
	RangeCalendar,
} from "@/components/ui/calendar";
import {
	DatePicker,
	DatePickerButton,
	DatePickerDialog,
	DatePickerPopover,
	DateRangePicker,
	DateRangePickerButton,
} from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<DatePicker>
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
									</Calendar>
								</div>
							</DatePickerDialog>
						</DatePickerPopover>
					</>
				)}
			</DatePicker>
			<DateRangePicker>
				{(date) => (
					<>
						<Label>Date Picker</Label>
						<DateRangePickerButton {...date} />
						<DatePickerPopover>
							<DatePickerDialog>
								<div className="w-fit rounded-md border p-4">
									<RangeCalendar>
										<CalendarHeader>
											<CalendarPreviousButton iconOnly />
											<CalendarHeading />
											<CalendarNextButton iconOnly />
										</CalendarHeader>

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
									</RangeCalendar>
								</div>
							</DatePickerDialog>
						</DatePickerPopover>
					</>
				)}
			</DateRangePicker>
		</div>
	);
}
