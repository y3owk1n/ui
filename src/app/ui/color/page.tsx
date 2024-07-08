"use client";
import Preview from "@/components/preview";
import {
	ColorArea,
	ColorSlider,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSliderTrack,
	ColorSwatch,
	ColorThumb,
	ColorWheel,
	ColorWheelTrack,
	parseColor,
} from "@/components/ui/color";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ColorAreaPage() {
	const [value, setValue] = useState(parseColor("hsl(0, 100%, 50%)"));

	return (
		<div className="grid gap-4">
			<Preview>
				<ColorArea
					value={value}
					onChange={setValue}
					defaultValue={value}
				>
					<ColorThumb />
				</ColorArea>
			</Preview>

			<Preview>
				<div className="grid w-full max-w-lg gap-2">
					<ColorSlider
						value={value}
						onChange={setValue}
						channel="hue"
						defaultValue={value}
						orientation="horizontal"
					>
						<div className="flex items-center justify-between">
							<Label />
							<ColorSliderOutput />
						</div>
						<ColorSliderTrack>
							<ColorSliderThumb />
						</ColorSliderTrack>
					</ColorSlider>
					<ColorSlider
						value={value}
						onChange={setValue}
						channel="saturation"
						defaultValue={value}
						orientation="horizontal"
					>
						<div className="flex items-center justify-between">
							<Label />
							<ColorSliderOutput />
						</div>
						<ColorSliderTrack>
							<ColorSliderThumb />
						</ColorSliderTrack>
					</ColorSlider>
				</div>
			</Preview>

			<Preview>
				<div className="grid gap-2">
					<ColorSwatch color={value} />
				</div>
			</Preview>

			<Preview>
				<div className="grid gap-2">
					<ColorWheel value={value} onChange={setValue}>
						<ColorWheelTrack />
						<ColorThumb />
					</ColorWheel>
				</div>
			</Preview>
		</div>
	);
}
