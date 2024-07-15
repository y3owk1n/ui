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
import * as React from "react";

export default function DatePickerDemo() {
	return (
		<DatePicker className="w-full max-w-[300px]">
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
