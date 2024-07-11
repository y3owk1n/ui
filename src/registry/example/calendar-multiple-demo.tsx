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

export default function CalendarMultipleDemo() {
	return (
		<Calendar visibleDuration={{ months: 2 }}>
			<CalendarHeader>
				<CalendarPreviousButton iconOnly />
				<CalendarHeading />
				<CalendarNextButton iconOnly />
			</CalendarHeader>

			<div className="flex flex-col gap-4 lg:flex-row">
				<CalendarGrid>
					<CalendarGridHeader>
						{(day) => (
							<CalendarGridHeaderCell>
								{day}
							</CalendarGridHeaderCell>
						)}
					</CalendarGridHeader>
					<CalendarGridBody>
						{(date) => <CalendarGridBodyCell date={date} />}
					</CalendarGridBody>
				</CalendarGrid>

				<CalendarGrid offset={{ months: 1 }}>
					<CalendarGridHeader>
						{(day) => (
							<CalendarGridHeaderCell>
								{day}
							</CalendarGridHeaderCell>
						)}
					</CalendarGridHeader>
					<CalendarGridBody>
						{(date) => <CalendarGridBodyCell date={date} />}
					</CalendarGridBody>
				</CalendarGrid>
			</div>

			<CalendarTextError />
		</Calendar>
	);
}
