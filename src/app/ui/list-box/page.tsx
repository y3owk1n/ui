"use client";
import Preview from "@/components/preview";
import { Card } from "@/registry/ui/card";
import {
	ListBox,
	ListBoxCollection,
	ListBoxHeader,
	ListBoxItem,
	ListBoxSection,
} from "@/registry/ui/list-box";

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

export default function ListBoxPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Card className="w-full max-w-lg p-2">
					<ListBox
						aria-label="Ice cream flavors (Multiple)"
						selectionMode="multiple"
						items={rows}
						renderEmptyState={() => "No results found."}
					>
						{(item) => (
							<ListBoxItem key={item.id}>{item.name}</ListBoxItem>
						)}
					</ListBox>
				</Card>
			</Preview>
			<Preview>
				<Card className="w-full max-w-lg p-2">
					<ListBox
						aria-label="Ice cream flavors (Single)"
						selectionMode="single"
						items={rows2}
						renderEmptyState={() => "No results found."}
					>
						{(section) => (
							<ListBoxSection id={section.name}>
								<ListBoxHeader>{section.name}</ListBoxHeader>
								<ListBoxCollection items={section.children}>
									{(item) => (
										<ListBoxItem>{item.name}</ListBoxItem>
									)}
								</ListBoxCollection>
							</ListBoxSection>
						)}
					</ListBox>
				</Card>
			</Preview>
		</div>
	);
}
