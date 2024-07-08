"use client";
import Preview from "@/components/preview";
import {
	ColorArea,
	ColorSlider,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSliderTrack,
	ColorSwatch,
	ColorSwatchPicker,
	ColorSwatchPickerItem,
	ColorThumb,
	ColorWheel,
	ColorWheelTrack,
	parseColor,
} from "@/components/ui/color";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

export default function ColorAreaPage() {
	const [value, setValue] = useState(parseColor("hsl(0, 100%, 50%)"));

	const colorChannels = useMemo(() => {
		return value.getColorChannels();
	}, [value]);

	console.log(">>>>>>>>>>>>>>>>>>>>>>>> colorChannels: ", colorChannels);

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
					{colorChannels.map((channel) => (
						<ColorSlider
							key={channel}
							value={value}
							onChange={setValue}
							channel={channel}
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
					))}
				</div>
			</Preview>

			<Preview>
				<ColorSwatchPicker
					aria-label="Fill color"
					className="flex flex-wrap gap-2"
					value={value}
					onChange={setValue}
				>
					<ColorSwatchPickerItem color="#A00">
						<ColorSwatch />
					</ColorSwatchPickerItem>
					<ColorSwatchPickerItem color="#F80">
						<ColorSwatch />
					</ColorSwatchPickerItem>
					<ColorSwatchPickerItem color="#080">
						<ColorSwatch />
					</ColorSwatchPickerItem>
					<ColorSwatchPickerItem color="#088">
						<ColorSwatch />
					</ColorSwatchPickerItem>
					<ColorSwatchPickerItem color="#008">
						<ColorSwatch />
					</ColorSwatchPickerItem>
				</ColorSwatchPicker>
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
