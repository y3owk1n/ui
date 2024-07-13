import {
	ColorSwatch,
	ColorSwatchPicker,
	ColorSwatchPickerItem,
	parseColor,
} from "@/registry/ui/color";
import * as React from "react";

export default function ColorSwatchDemo() {
	const [color, setColor] = React.useState(parseColor("hsl(0, 100%, 50%)"));

	return (
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
	);
}
