"use client";
import Preview from "@/components/preview";
import { parseColor } from "@/components/ui/color-area";
import {
	ColorSlider,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSliderTrack,
} from "@/components/ui/color-slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ColorAreaPage() {
	const [value, setValue] = useState(parseColor("hsl(0, 100%, 50%)"));

	return (
		<div className="grid gap-4">
			<Preview>
				<div className="w-full max-w-lg">
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
				</div>
			</Preview>
		</div>
	);
}
