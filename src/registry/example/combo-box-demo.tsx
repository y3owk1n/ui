import {
	ComboBox,
	ComboBoxContent,
	ComboBoxItem,
	ComboBoxLabel,
	ComboBoxPopover,
	ComboBoxTrigger,
} from "@/registry/ui/combo-box";
import * as React from "react";

const rows = [
	{ id: 1, name: "Chocolate" },
	{ id: 2, name: "Mint" },
	{ id: 3, name: "Strawberry" },
	{ id: 4, name: "Vanilla" },
];

export default function ComboBoxDemo() {
	return (
		<ComboBox className="w-full max-w-[200px]" defaultItems={rows}>
			<ComboBoxLabel>Label</ComboBoxLabel>
			<ComboBoxTrigger placeholder="Select something" />
			<ComboBoxPopover>
				<ComboBoxContent<(typeof rows)[number]>>
					{(item) => (
						<ComboBoxItem textValue={item.name}>
							{item.name}
						</ComboBoxItem>
					)}
				</ComboBoxContent>
			</ComboBoxPopover>
		</ComboBox>
	);
}
