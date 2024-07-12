"use client";
import Preview from "@/components/preview";
import { Card } from "@/registry/ui/card";
import { GridList, GridListItem } from "@/registry/ui/grid-list";

const rows = [
	{ id: 1, name: "Chocolate" },
	{ id: 2, name: "Mint" },
	{ id: 3, name: "Strawberry" },
	{ id: 4, name: "Vanilla" },
];

export default function GridListPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Card className="w-full max-w-lg p-2">
					<GridList
						aria-label="Ice cream flavors (Multiple)"
						selectionMode="multiple"
						items={rows}
						renderEmptyState={() => "No results found."}
					>
						{(item) => (
							<GridListItem key={item.id}>
								<div className="flex w-full items-center justify-between">
									{item.name}
								</div>
							</GridListItem>
						)}
					</GridList>
				</Card>
			</Preview>
			<Preview>
				<Card className="w-full max-w-lg p-2">
					<GridList
						aria-label="Ice cream flavors (Multiple)"
						selectionMode="multiple"
						items={rows}
						renderEmptyState={() => "No results found."}
					>
						{(item) => (
							<GridListItem highlightSelected key={item.id}>
								<div className="flex w-full items-center justify-between">
									{item.name}
								</div>
							</GridListItem>
						)}
					</GridList>
				</Card>
			</Preview>
		</div>
	);
}
