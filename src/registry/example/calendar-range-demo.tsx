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
	CalendarTextError,
	RangeCalendar,
} from "@/registry/ui/calendar";

export default function CalendarRangeDemo() {
	return (
		<RangeCalendar>
			<CalendarHeader>
				<CalendarPreviousButton iconOnly />
				<CalendarHeading />
				<CalendarNextButton iconOnly />
			</CalendarHeader>

			<CalendarGrid>
				<CalendarGridHeader>
					{(day) => (
						<CalendarGridHeaderCell>{day}</CalendarGridHeaderCell>
					)}
				</CalendarGridHeader>
				<CalendarGridBody>
					{(date) => <CalendarGridBodyCell date={date} />}
				</CalendarGridBody>
			</CalendarGrid>
			<CalendarTextError />
		</RangeCalendar>
	);
}
