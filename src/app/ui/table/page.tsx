"use client";
import { Card } from "@/components/ui/card";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const navData: { id: string; name: string }[] = [
	{
		id: "client-hooks",
		name: "Client with hook",
	},
	{
		id: "client-manual",
		name: "Client manual",
	},
	{
		id: "server",
		name: "Server",
	},
];

export default function Home() {
	return (
		<div className="">
			<h1 className="font-heading mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
				Table UI Navigations
			</h1>
			<Card className="max-w-[300px] p-2">
				<ListBox
					aria-label="Links"
					// selectionMode="multiple"
					// selectionBehavior="replace"
					items={navData}
				>
					{(item) => (
						<ListBoxItem
							key={item.id}
							href={`/ui/table/${item.id}`}
						>
							{item.name}
						</ListBoxItem>
					)}
				</ListBox>
			</Card>
		</div>
	);
}
