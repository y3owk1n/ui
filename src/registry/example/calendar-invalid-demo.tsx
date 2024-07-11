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
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date";
import * as React from "react";
import { useLocale } from "react-aria-components";

export default function CalendarInvalidDemo() {
	const [date, setDate] = React.useState(today(getLocalTimeZone()));
	const { locale } = useLocale();
	const isInvalid = isWeekend(date, locale);

	return (
		<Calendar value={date} onChange={setDate} isInvalid={isInvalid}>
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
