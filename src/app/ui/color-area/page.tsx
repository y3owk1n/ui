"use client";
import Preview from "@/components/preview";
import { ColorArea, ColorThumb, parseColor } from "@/components/ui/color-area";
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
		</div>
	);
}
