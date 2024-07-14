import {
	ComboBox,
	ComboBoxCollection,
	ComboBoxContent,
	ComboBoxHeader,
	ComboBoxItem,
	ComboBoxLabel,
	ComboBoxPopover,
	ComboBoxSection,
	ComboBoxTrigger,
} from "@/registry/ui/combo-box";
import * as React from "react";

const rows = [
	{
		name: "Australian",
		children: [
			{ id: 2, name: "Koala" },
			{ id: 3, name: "Kangaroo" },
			{ id: 4, name: "Platypus" },
		],
	},
	{
		name: "American",
		children: [
			{ id: 6, name: "Bald Eagle" },
			{ id: 7, name: "Bison" },
			{ id: 8, name: "Skunk" },
		],
	},
];

export default function ComboBoxSectionDemo() {
	return (
		<ComboBox className="w-full max-w-[200px]" defaultItems={rows}>
			<ComboBoxLabel>With Sections</ComboBoxLabel>
			<ComboBoxTrigger placeholder="Select something" />
			<ComboBoxPopover>
				<ComboBoxContent<(typeof rows)[number]>>
					{(section) => (
						<ComboBoxSection id={section.name}>
							<ComboBoxHeader>{section.name}</ComboBoxHeader>
							<ComboBoxCollection items={section.children}>
								{(item) => (
									<ComboBoxItem textValue={item.name}>
										{item.name}
									</ComboBoxItem>
								)}
							</ComboBoxCollection>
						</ComboBoxSection>
					)}
				</ComboBoxContent>
			</ComboBoxPopover>
		</ComboBox>
	);
}
