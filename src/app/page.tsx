"use client";
import { Card } from "@/components/ui/card";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";

const navData: { id: string; name: string }[] = [
	{
		id: "accordion",
		name: "Accordion",
	},
	{
		id: "alert",
		name: "Alert",
	},
	{
		id: "avatar",
		name: "Avatar",
	},
	{
		id: "badge",
		name: "Badge",
	},
	{
		id: "border-group",
		name: "Border Group",
	},
	{
		id: "button",
		name: "Button",
	},
	{
		id: "calendar",
		name: "Calendar",
	},
	{
		id: "carousel",
		name: "Carousel",
	},
	{
		id: "checkbox",
		name: "Checkbox",
	},
	{
		id: "color",
		name: "Color",
	},
	{
		id: "color-picker",
		name: "Color Picker",
	},
	{
		id: "combo-box",
		name: "Combo Box",
	},
	{
		id: "date-picker",
		name: "Date Picker",
	},
	{
		id: "date-range-picker",
		name: "Date Range Picker",
	},
	{
		id: "dialog",
		name: "Dialog",
	},
	{
		id: "drawer",
		name: "Drawer",
	},
	{
		id: "file-trigger",
		name: "File Trigger",
	},
	{
		id: "form",
		name: "Form",
	},
	{
		id: "gallery",
		name: "Gallery",
	},
	{
		id: "grid-list",
		name: "Grid List",
	},
	{
		id: "input",
		name: "Input",
	},
	{
		id: "keyboard",
		name: "Keyboard",
	},
	{
		id: "label",
		name: "Label",
	},
	{
		id: "list-box",
		name: "List Box",
	},
	{
		id: "menu",
		name: "Menu",
	},
	{
		id: "meter",
		name: "Meter",
	},
	{
		id: "pagination",
		name: "Pagination",
	},
	{
		id: "popover",
		name: "Popover",
	},
	{
		id: "progress-bar",
		name: "Progress Bar",
	},
	{
		id: "progress-ring",
		name: "Progress Ring",
	},
	{
		id: "radio",
		name: "Radio",
	},
	{
		id: "scroll-area",
		name: "Scroll Area",
	},
	{
		id: "select",
		name: "Select",
	},
	{
		id: "sheet",
		name: "Sheet",
	},
	{
		id: "slider",
		name: "Slider",
	},
	{
		id: "switch",
		name: "Switch",
	},
	{
		id: "table",
		name: "Table",
	},
	{
		id: "tabs",
		name: "Tabs",
	},
	{
		id: "toast",
		name: "Toast",
	},
	{
		id: "toggle-button",
		name: "Toggle Button",
	},
	{
		id: "tooltip",
		name: "Tooltip",
	},
];

export default function Home() {
	return (
		<main className="container my-8">
			<h1 className="font-heading mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
				UI Navigations
			</h1>
			<Card className="w-full p-2 sm:max-w-[300px]">
				<ListBox
					aria-label="Links"
					// selectionMode="multiple"
					// selectionBehavior="replace"
					items={navData}
				>
					{(item) => (
						<ListBoxItem key={item.id} href={`/ui/${item.id}`}>
							{item.name}
						</ListBoxItem>
					)}
				</ListBox>
			</Card>
		</main>
	);
}
