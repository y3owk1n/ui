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
	CalendarTextError,
} from "@/registry/ui/calendar";

export default function CalendarDemo() {
	return (
		<Calendar>
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
		</Calendar>
	);
}
