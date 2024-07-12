"use client";
import Preview from "@/components/preview";
import {
	ProgressBar,
	ProgressBarLabel,
	ProgressBarTrack,
	ProgressBarTrackFill,
} from "@/registry/ui/progress-bar";
import { useEffect, useState } from "react";

export default function ProgressBarPage() {
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
			<Preview>
				<ProgressBar
					aria-label="progress bar"
					value={progress}
					className="md:w-[60%]"
					isIndeterminate
				>
					{({ percentage, isIndeterminate, valueText }) => (
						<>
							<div className="mb-2">
								<ProgressBarLabel>
									Progress: {valueText}
								</ProgressBarLabel>
							</div>
							<ProgressBarTrack>
								<ProgressBarTrackFill
									percentage={percentage}
									isIndeterminate={isIndeterminate}
								/>
							</ProgressBarTrack>
						</>
					)}
				</ProgressBar>
			</Preview>
			<Preview>
				<ProgressBar
					aria-label="progress bar"
					value={progress}
					className="md:w-[60%]"
				>
					{({ percentage, isIndeterminate, valueText }) => (
						<>
							<div className="mb-2">
								<ProgressBarLabel>
									Progress: {valueText}
								</ProgressBarLabel>
							</div>
							<ProgressBarTrack>
								<ProgressBarTrackFill
									percentage={percentage}
									isIndeterminate={isIndeterminate}
								/>
							</ProgressBarTrack>
						</>
					)}
				</ProgressBar>
			</Preview>
			<Preview>
				<ProgressBar
					aria-label="progress bar"
					value={progress}
					className="md:w-[60%]"
					minValue={0}
					maxValue={1000}
					valueLabel={`${progress} of 1000GB`}
				>
					{({ percentage, isIndeterminate, valueText }) => (
						<>
							<div className="mb-2">
								<ProgressBarLabel>
									Storage: {valueText}
								</ProgressBarLabel>
							</div>
							<ProgressBarTrack>
								<ProgressBarTrackFill
									percentage={percentage}
									isIndeterminate={isIndeterminate}
								/>
							</ProgressBarTrack>
						</>
					)}
				</ProgressBar>
			</Preview>
		</div>
	);
}
