"use client";
import Preview from "@/components/preview";
import { Button } from "@/registry/ui/button";
import {
	ColorArea,
	ColorPicker,
	ColorSlider,
	ColorSliderOutput,
	ColorSliderThumb,
	ColorSliderTrack,
	ColorSwatch,
	ColorThumb,
	parseColor,
} from "@/registry/ui/color";
import { ColorField } from "@/registry/ui/color-field";
import { Dialog, DialogTrigger } from "@/registry/ui/dialog";
import { FieldError } from "@/registry/ui/field-error";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Popover } from "@/registry/ui/popover";
import { useMemo, useState } from "react";

export default function ColorPickerPage() {
	const [color, setColor] = useState(parseColor("hsl(0, 100%, 50%)"));

	const colorChannels = useMemo(() => {
		return color.getColorChannels();
	}, [color]);

	const colorSpace = useMemo(() => {
		return color.getColorSpace();
	}, [color]);

	return (
		<div className="grid gap-4">
			<Preview>
				<ColorPicker value={color} onChange={setColor}>
					<DialogTrigger>
						<Button variant="outline">
							<ColorSwatch className="mr-2 size-4 rounded-full" />
							<span>Fill color</span>
						</Button>
						<Popover>
							<Dialog className="grid gap-4 p-4">
								<ColorArea
									className="w-full"
									value={color}
									onChange={setColor}
									defaultValue={color}
									colorSpace={colorSpace}
								>
									<ColorThumb />
								</ColorArea>
								{colorChannels.map((channel) => (
									<ColorSlider
										key={channel}
										value={color}
										onChange={setColor}
										channel={channel}
										defaultValue={color}
										orientation="horizontal"
										colorSpace={colorSpace}
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
								<ColorField
									value={color}
									onChange={(color) => {
										if (color) setColor(color);
									}}
									className="w-full max-w-lg"
									colorSpace={colorSpace}
								>
									<Label>Background Color</Label>
									<Input placeholder="#000" />
									<FieldError />
								</ColorField>
							</Dialog>
						</Popover>
					</DialogTrigger>
				</ColorPicker>
			</Preview>
		</div>
	);
}
