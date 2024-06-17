"use client";
import { Label } from "@/components/ui/label";
import {
	Slider,
	SliderOutput,
	SliderThumb,
	SliderTrack,
} from "@/components/ui/slider";

export default function CheckboxPage() {
	return (
		<div className="grid gap-8">
			<Slider defaultValue={[30, 60]}>
				<div className="grid w-full gap-4">
					<Label>Range Slider</Label>

					<SliderOutput>
						{({ state }) =>
							state.values
								.map((_, i) => state.getThumbValueLabel(i))
								.join(" – ")
						}
					</SliderOutput>

					<SliderTrack>
						{({ state }) =>
							state.values.map((_, i) => (
								<SliderThumb key={i} index={i} />
							))
						}
					</SliderTrack>
				</div>
			</Slider>
			<Slider defaultValue={30}>
				<div className="grid w-full gap-4">
					<Label>Range Slider</Label>

					<SliderOutput>
						{({ state }) =>
							state.values
								.map((_, i) => state.getThumbValueLabel(i))
								.join(" – ")
						}
					</SliderOutput>

					<SliderTrack>
						{({ state }) =>
							state.values.map((_, i) => (
								<SliderThumb key={i} index={i} />
							))
						}
					</SliderTrack>
				</div>
			</Slider>
			<Slider orientation="vertical" defaultValue={[30, 60]}>
				<div className="grid w-full gap-4">
					<Label>Range Slider</Label>

					<SliderOutput>
						{({ state }) =>
							state.values
								.map((_, i) => state.getThumbValueLabel(i))
								.join(" – ")
						}
					</SliderOutput>

					<div className="h-[300px]">
						<SliderTrack>
							{({ state }) =>
								state.values.map((_, i) => (
									<SliderThumb key={i} index={i} />
								))
							}
						</SliderTrack>
					</div>
				</div>
			</Slider>
			<Slider orientation="vertical" defaultValue={30}>
				<div className="grid w-full gap-4">
					<Label>Range Slider</Label>

					<SliderOutput>
						{({ state }) =>
							state.values
								.map((_, i) => state.getThumbValueLabel(i))
								.join(" – ")
						}
					</SliderOutput>

					<div className="h-[300px]">
						<SliderTrack>
							{({ state }) =>
								state.values.map((_, i) => (
									<SliderThumb key={i} index={i} />
								))
							}
						</SliderTrack>
					</div>
				</div>
			</Slider>
		</div>
	);
}
