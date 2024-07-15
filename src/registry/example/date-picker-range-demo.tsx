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
import { Label } from "@/registry/ui/label";
import * as React from "react";

export default function DatePickerRangeDemo() {
	return (
		<DateRangePicker className="w-full max-w-[300px]">
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
								</RangeCalendar>
							</div>
						</DatePickerDialog>
					</DatePickerPopover>
				</>
			)}
		</DateRangePicker>
	);
}
