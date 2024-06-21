import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/components/ui/menu";
import { type TableColumnDefs } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export interface CharacterRes {
	results: Character[];
	count: number;
	next: string | null;
	previous: string | null;
}

export interface Character {
	name: string;
	height: number;
	mass: number;
	birth_year: string;
}

export interface CharacterWithId extends Character {
	id: string;
}

export const columns: TableColumnDefs<CharacterWithId>[] = [
	{
		header: "Name",
		id: "name",
		isRowHeader: true,
	},
	{
		header: "Height",
		isRowHeader: true,
		allowsSorting: true,
		id: "height",
		cell: (item) => <span>{item.height} cm</span>,
	},
	{
		header: "Mass",
		isRowHeader: true,
		id: "mass",
		allowsSorting: true,
		cell: (item) => <span>{item.mass} kg</span>,
	},
	{
		header: "Birth Year",
		id: "birth_year",

		isRowHeader: true,
	},
	{
		header: "Actions",
		isRowHeader: true,
		id: "actions",
		cell: (item) => (
			<MenuTrigger>
				<Button
					aria-label="Menu"
					className="size-8 p-0"
					variant="ghost"
					size="icon"
				>
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
				<MenuPopover className="min-w-[8rem]">
					<Menu
						onAction={(key) =>
							typeof window !== "undefined"
								? alert(key)
								: console.log(key)
						}
					>
						<MenuItem id="open">Open</MenuItem>
						<MenuItem id="rename">Rename…</MenuItem>
						<MenuItem id="duplicate">Duplicate</MenuItem>
						<MenuItem id="share">Share…</MenuItem>
						<MenuItem id="delete">Delete…</MenuItem>
					</Menu>
				</MenuPopover>
			</MenuTrigger>
		),
	},
];
