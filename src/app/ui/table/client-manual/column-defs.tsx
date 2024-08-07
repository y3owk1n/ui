import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/registry/ui/menu";
import { type TableColumnDefs } from "@/registry/ui/table";
import { MoreHorizontal } from "lucide-react";

export type StatusOption = "active" | "paused" | "vacation";

export interface User {
	id: number;
	name: string;
	role: string;
	team: string;
	status: string;
	age: string;
	avatar: string;
	email: string;
}

export const statuses: {
	id: StatusOption;
	name: string;
}[] = [
	{ id: "active", name: "Active" },
	{ id: "paused", name: "Paused" },
	{ id: "vacation", name: "Vacation" },
];

export const columns: TableColumnDefs<User>[] = [
	{
		header: "ID",
		id: "id",
		isRowHeader: true,
		allowsSorting: true,
	},
	{
		header: "Name",
		isRowHeader: true,
		allowsSorting: true,
		id: "name",
	},
	{
		header: "Age",
		isRowHeader: true,
		id: "age",
		allowsSorting: true,
	},
	{
		header: "Role",
		isRowHeader: true,
		id: "role",
		allowsSorting: true,
	},
	{
		header: "Team",
		id: "team",
		isRowHeader: true,
	},
	{
		header: "Email",
		id: "email",
		isRowHeader: true,
	},
	{
		header: "Status",
		isRowHeader: true,
		id: "status",
		allowsSorting: true,
		cell: (item) =>
			statuses.find((status) => status.id === item.status)?.name,
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
