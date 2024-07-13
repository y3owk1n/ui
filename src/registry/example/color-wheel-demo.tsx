import {
	ColorThumb,
	ColorWheel,
	ColorWheelTrack,
	parseColor,
} from "@/registry/ui/color";
import * as React from "react";

export default function ColorWheelDemo() {
	const [color, setColor] = React.useState(parseColor("hsl(0, 100%, 50%)"));

	return (
		<ColorWheel value={color} onChange={setColor}>
			<ColorWheelTrack />
			<ColorThumb />
		</ColorWheel>
	);
}
