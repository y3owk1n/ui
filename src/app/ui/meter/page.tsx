"use client";
import {
	Meter,
	MeterLabel,
	MeterTrack,
	MeterTrackFill,
} from "@/components/ui/meter";
import { useEffect, useState } from "react";

export default function CheckboxPage() {
	const [progress, setProgress] = useState(13);

	useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="grid gap-4">
			<Meter aria-label="meter bar" value={progress} className="w-[60%]">
				{({ valueText, percentage }) => (
					<>
						<div className="mb-2">
							<MeterLabel>Progress: {valueText}</MeterLabel>
						</div>
						<MeterTrack>
							<MeterTrackFill percentage={percentage} />
						</MeterTrack>
					</>
				)}
			</Meter>
			<Meter
				aria-label="meter bar"
				value={progress}
				className="w-[60%]"
				formatOptions={{ style: "currency", currency: "JPY" }}
			>
				{({ valueText, percentage }) => (
					<>
						<div className="mb-2">
							<MeterLabel>Currency: {valueText}</MeterLabel>
						</div>
						<MeterTrack>
							<MeterTrackFill percentage={percentage} />
						</MeterTrack>
					</>
				)}
			</Meter>
			<Meter
				aria-label="meter bar"
				value={progress}
				className="w-[60%]"
				minValue={0}
				maxValue={1000}
				valueLabel={`${progress} of 1000GB`}
			>
				{({ valueText, percentage }) => (
					<>
						<div className="mb-2">
							<MeterLabel>Storage: {valueText}</MeterLabel>
						</div>
						<MeterTrack>
							<MeterTrackFill percentage={percentage} />
						</MeterTrack>
					</>
				)}
			</Meter>
		</div>
	);
}
