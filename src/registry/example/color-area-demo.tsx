import { ColorArea, ColorThumb, parseColor } from "@/registry/ui/color";
import * as React from "react";

export default function ColorAreaDemo() {
	const [color, setColor] = React.useState(parseColor("hsl(0, 100%, 50%)"));

	return (
		<ColorArea value={color} onChange={setColor} defaultValue={color}>
			<ColorThumb />
		</ColorArea>
	);
}
