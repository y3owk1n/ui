"use client";
import Preview from "@/components/preview";
import {
	ColorArea,
	ColorSlider,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSliderTrack,
	ColorThumb,
	parseColor,
} from "@/components/ui/color";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ColorAreaPage() {
	const [value, setValue] = useState(parseColor("hsl(0, 100%, 50%)"));

	return (
		<div className="grid gap-4">
			<Preview>
				<div className="grid gap-2">
					<ColorArea
						value={value}
						onChange={setValue}
						defaultValue="hsl(30, 100%, 50%)"
					>
						<ColorThumb />
					</ColorArea>

					<p>Value: {value.toString("hex")}</p>
				</div>
			</Preview>

			<Preview>
				<div className="grid w-full max-w-lg gap-2">
					<ColorSlider
						value={value}
						onChange={setValue}
						channel="hue"
						defaultValue="hsl(30, 100%, 50%)"
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
						defaultValue="hsl(30, 100%, 50%)"
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
		</div>
	);
}
