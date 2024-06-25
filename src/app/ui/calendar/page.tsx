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

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
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
									<CalendarGridBodyCell date={date} />
								</>
							)}
						</CalendarGridBody>
					</CalendarGrid>
				</RangeCalendar>
			</div>
			<div className="w-fit rounded-md border p-4">
				<Calendar visibleDuration={{ months: 3 }}>
					<CalendarHeader>
						<CalendarPreviousButton iconOnly />
						<CalendarHeading />
						<CalendarNextButton iconOnly />
					</CalendarHeader>

					<div className="flex gap-4">
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

						<CalendarGrid offset={{ months: 1 }}>
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

						<CalendarGrid offset={{ months: 2 }}>
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
					</div>
				</Calendar>
			</div>
		</div>
	);
}
