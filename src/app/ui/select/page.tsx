"use client";
import {
	Select,
	SelectCollection,
	SelectContent,
	SelectHeader,
	SelectItem,
	SelectPopover,
	SelectSection,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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

export default function SelectPage() {
	return (
		<div className="grid gap-4">
			<Select placeholder="Select an item" aria-label="item selection">
				<SelectTrigger className="w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectPopover>
					<SelectContent aria-label="items" items={rows}>
						{(item) => (
							<SelectItem textValue={item.name} key={item.id}>
								{item.name}
							</SelectItem>
						)}
					</SelectContent>
				</SelectPopover>
			</Select>
			<Select placeholder="Select an item" aria-label="item selection">
				<SelectTrigger className="w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectPopover>
					<SelectContent aria-label="items" items={rows2}>
						{(section) => (
							<SelectSection id={section.name}>
								<SelectHeader>{section.name}</SelectHeader>
								<SelectCollection items={section.children}>
									{(item) => (
										<SelectItem textValue={item.name}>
											{item.name}
										</SelectItem>
									)}
								</SelectCollection>
							</SelectSection>
						)}
					</SelectContent>
				</SelectPopover>
			</Select>
		</div>
	);
}
