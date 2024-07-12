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
} from "@/registry/ui/color";
import { ColorField } from "@/registry/ui/color-field";
import { FieldDescription } from "@/registry/ui/field-description";
import { FieldError } from "@/registry/ui/field-error";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { useMemo, useState } from "react";
import { useLocale } from "react-aria-components";

export default function ColorPage() {
	const [color, setColor] = useState(parseColor("hsl(0, 100%, 50%)"));

	const { locale } = useLocale();

	const colorChannels = useMemo(() => {
		return color.getColorChannels();
	}, [color]);

	const colorSpace = useMemo(() => {
		return color.getColorSpace();
	}, [color]);

	return (
		<div className="grid gap-4">
			<Preview>
				<div className="grid gap-2">
					<ColorField
						value={color}
						onChange={(color) => {
							if (color) setColor(color);
						}}
						className="w-full max-w-lg"
					>
						<Label>Background Color</Label>
						<Input placeholder="#000" />
						<FieldDescription>
							Any color that you like
						</FieldDescription>
						<FieldError />
					</ColorField>
					<div className="flex gap-2">
						{colorChannels.map((channel) => (
							<ColorField
								key={channel}
								colorSpace={colorSpace}
								channel={channel}
								className="w-full max-w-lg"
								value={color}
								onChange={(color) => {
									if (color) setColor(color);
								}}
							>
								<Label>
									{color.getChannelName(channel, locale)}
								</Label>
								<Input />
								<FieldError />
							</ColorField>
						))}
					</div>
				</div>
			</Preview>
			<Preview>
				<ColorArea
					value={color}
					onChange={setColor}
					defaultValue={color}
				>
					<ColorThumb />
				</ColorArea>
			</Preview>

			<Preview>
				<div className="grid w-full max-w-lg gap-2">
					{colorChannels.map((channel) => (
						<ColorSlider
							key={channel}
							value={color}
							onChange={setColor}
							channel={channel}
							defaultValue={color}
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
					value={color}
					onChange={setColor}
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
					<ColorWheel value={color} onChange={setColor}>
						<ColorWheelTrack />
						<ColorThumb />
					</ColorWheel>
				</div>
			</Preview>
		</div>
	);
}
