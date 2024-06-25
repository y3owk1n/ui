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
} from "@/components/ui/calendar";

export default function CheckboxPage() {
	return (
		<div className="">
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
									<CalendarGridBodyCell date={date} />
								</>
							)}
						</CalendarGridBody>
					</CalendarGrid>
				</Calendar>
			</div>
		</div>
	);
}
