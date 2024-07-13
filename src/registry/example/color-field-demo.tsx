import { parseColor } from "@/registry/ui/color";
import { ColorField } from "@/registry/ui/color-field";
import { FieldDescription } from "@/registry/ui/field-description";
import { FieldError } from "@/registry/ui/field-error";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import * as React from "react";
import { useLocale } from "react-aria-components";

export default function ColorFieldDemo() {
	const [color, setColor] = React.useState(parseColor("hsl(0, 100%, 50%)"));

	const { locale } = useLocale();

	const colorChannels = React.useMemo(() => {
		return color.getColorChannels();
	}, [color]);

	const colorSpace = React.useMemo(() => {
		return color.getColorSpace();
	}, [color]);

	return (
		<div className="grid max-w-[400px] gap-2">
			<ColorField
				value={color}
				onChange={(color) => {
					if (color) setColor(color);
				}}
				className="w-full max-w-lg"
			>
				<Label>Background Color</Label>
				<Input placeholder="#000" />
				<FieldDescription>Any color that you like</FieldDescription>
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
						<Label>{color.getChannelName(channel, locale)}</Label>
						<Input />
						<FieldError />
					</ColorField>
				))}
			</div>
		</div>
	);
}
