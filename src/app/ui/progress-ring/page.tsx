"use client";
import {
	ProgressRing,
	ProgressRingInner,
	ProgressRingInnerFill,
	ProgressRingLabel,
	ProgressRingOuter,
} from "@/components/ui/progress-ring";
import { useEffect, useState } from "react";

export default function ProgressRingPage() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev < 100) {
					return prev + 1;
				} else {
					clearInterval(interval);
					return 100;
				}
			});
		}, 100); // Change this value to adjust the speed of the progress bar

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="grid gap-4">
			<ProgressRing
				aria-label="progress ring"
				isIndeterminate
				value={progress}
			>
				{({ percentage, isIndeterminate }) => (
					<ProgressRingOuter>
						<ProgressRingInner />
						<ProgressRingInnerFill
							percentage={percentage}
							isIndeterminate={isIndeterminate}
						/>
					</ProgressRingOuter>
				)}
			</ProgressRing>
			<ProgressRing aria-label="progress ring" value={progress}>
				{({ percentage, isIndeterminate, valueText }) => (
					<>
						<ProgressRingLabel className="absolute">
							{valueText}
						</ProgressRingLabel>
						<ProgressRingOuter>
							<ProgressRingInner />
							<ProgressRingInnerFill
								percentage={percentage}
								isIndeterminate={isIndeterminate}
							/>
						</ProgressRingOuter>
					</>
				)}
			</ProgressRing>
			<ProgressRing
				aria-label="progress ring"
				value={progress}
				minValue={0}
				maxValue={1000}
				valueLabel={`${progress} of 1000GB`}
			>
				{({ percentage, isIndeterminate, valueText }) => (
					<>
						<ProgressRingLabel className="absolute">
							{valueText}
						</ProgressRingLabel>
						<ProgressRingOuter>
							<ProgressRingInner />
							<ProgressRingInnerFill
								percentage={percentage}
								isIndeterminate={isIndeterminate}
							/>
						</ProgressRingOuter>
					</>
				)}
			</ProgressRing>
		</div>
	);
}
