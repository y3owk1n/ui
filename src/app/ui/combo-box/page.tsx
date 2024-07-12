"use client";
import Preview from "@/components/preview";
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

const rows = [
	{ id: 1, name: "Chocolate" },
	{ id: 2, name: "Mint" },
	{ id: 3, name: "Strawberry" },
	{ id: 4, name: "Vanilla" },
];

const rows2 = [
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

export default function ComboBoxPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<ComboBox className="w-full max-w-lg" defaultItems={rows}>
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
			</Preview>
			<Preview>
				<ComboBox className="w-full max-w-lg" defaultItems={rows2}>
					<ComboBoxLabel>Label</ComboBoxLabel>
					<ComboBoxTrigger placeholder="Select something" />
					<ComboBoxPopover>
						<ComboBoxContent<(typeof rows2)[number]>>
							{(section) => (
								<ComboBoxSection id={section.name}>
									<ComboBoxHeader>
										{section.name}
									</ComboBoxHeader>
									<ComboBoxCollection
										items={section.children}
									>
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
			</Preview>
		</div>
	);
}
