import {
	ColorSlider,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSliderTrack,
	parseColor,
} from "@/registry/ui/color";
import { Label } from "@/registry/ui/label";
import * as React from "react";

export default function ColorSliderDemo() {
	const [color, setColor] = React.useState(parseColor("hsl(0, 100%, 50%)"));

	const colorChannels = React.useMemo(() => {
		return color.getColorChannels();
	}, [color]);

	return (
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
	);
}
