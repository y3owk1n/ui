import { type MainNavItem, type SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Components",
			href: "/docs/components/accordion",
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs",
					items: [],
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: [],
				},
				{
					title: "Changelog",
					href: "/docs/changelog",
					items: [],
				},
			],
		},
		{
			title: "Components",
			items: [
				{
					title: "Accordion",
					href: "/docs/components/accordion",
					items: [],
				},
				{
					title: "Alert",
					href: "/docs/components/alert",
					items: [],
				},
				{
					title: "Avatar",
					href: "/docs/components/avatar",
					items: [],
				},
				{
					title: "Badge",
					href: "/docs/components/badge",
					items: [],
				},
				{
					title: "Border Group",
					href: "/docs/components/border-group",
					items: [],
				},
				{
					title: "Button",
					href: "/docs/components/button",
					items: [],
				},
				{
					title: "Calendar",
					href: "/docs/components/calendar",
					items: [],
				},
				{
					title: "Card",
					href: "/docs/components/card",
					items: [],
				},
				{
					title: "Carousel",
					href: "/docs/components/carousel",
					items: [],
				},
				{
					title: "Checkbox Group",
					href: "/docs/components/checkbox-group",
					// label: "New",
					items: [],
				},
				{
					title: "Checkbox",
					href: "/docs/components/checkbox",
					items: [],
				},
				{
					title: "Color Field",
					href: "/docs/components/color-field",
					items: [],
				},
				{
					title: "Color",
					href: "/docs/components/color",
					items: [],
				},
				{
					title: "Combo Box",
					href: "/docs/components/combo-box",
					items: [],
				},
				{
					title: "Date Field",
					href: "/docs/components/date-field",
					items: [],
				},
				{
					title: "Date Picker",
					href: "/docs/components/date-picker",
					items: [],
				},
				{
					title: "Dialog",
					href: "/docs/components/dialog",
					items: [],
				},
				{
					title: "Field Description",
					href: "/docs/components/field-description",
					items: [],
				},
				{
					title: "Field Error",
					href: "/docs/components/field-error",
					items: [],
				},
				{
					title: "File Trigger",
					href: "/docs/components/file-trigger",
					items: [],
				},
				{
					title: "Form",
					href: "/docs/components/form",
					items: [],
				},
				{
					title: "Gallery",
					href: "/docs/components/gallery",
					items: [],
				},
				{
					title: "Grid List",
					href: "/docs/components/grid-list",
					items: [],
				},
				{
					title: "Image Magnifier",
					href: "/docs/components/image-magnifier",
					items: [],
				},
				{
					title: "Input",
					href: "/docs/components/input",
					items: [],
				},
				{
					title: "Keyboard",
					href: "/docs/components/keyboard",
					items: [],
				},
				{
					title: "Label",
					href: "/docs/components/label",
					items: [],
				},
				{
					title: "List Box",
					href: "/docs/components/list-box",
					items: [],
				},
				{
					title: "Menu",
					href: "/docs/components/menu",
					items: [],
				},
				{
					title: "Meter",
					href: "/docs/components/meter",
					items: [],
				},
				{
					title: "Number Field",
					href: "/docs/components/number-field",
					items: [],
				},
				{
					title: "OTP Field",
					href: "/docs/components/otp-field",
					items: [],
				},
				{
					title: "Pagination",
					href: "/docs/components/pagination",
					items: [],
				},
				{
					title: "Password Field",
					href: "/docs/components/password-field",
					items: [],
				},
				{
					title: "Popover",
					href: "/docs/components/popover",
					items: [],
				},
				{
					title: "Progress Bar",
					href: "/docs/components/progress-bar",
					items: [],
				},
				{
					title: "Progress Ring",
					href: "/docs/components/progress-ring",
					items: [],
				},
				{
					title: "Radio Group",
					href: "/docs/components/radio-group",
					items: [],
				},
				{
					title: "Responsive Dialog Drawer",
					href: "/docs/components/responsive-dialog-drawer",
					items: [],
				},
				{
					title: "Scroll Area",
					href: "/docs/components/scroll-area",
					items: [],
				},
				{
					title: "Search Field",
					href: "/docs/components/search-field",
					items: [],
				},
				{
					title: "Select",
					href: "/docs/components/select",
					items: [],
				},
				{
					title: "Separator",
					href: "/docs/components/separator",
					items: [],
				},
				{
					title: "Sheet",
					href: "/docs/components/sheet",
					items: [],
				},
				{
					title: "Skeleton",
					href: "/docs/components/skeleton",
					items: [],
				},
				{
					title: "Slider",
					href: "/docs/components/slider",
					items: [],
				},
				{
					title: "Switch",
					href: "/docs/components/switch",
					items: [],
				},
				{
					title: "Table",
					href: "/docs/components/table",
					items: [],
				},
				{
					title: "Tabs",
					href: "/docs/components/tabs",
					items: [],
				},
				{
					title: "Textarea",
					href: "/docs/components/textarea",
					items: [],
				},
				{
					title: "Text Field",
					href: "/docs/components/text-field",
					items: [],
				},
				{
					title: "Time Field",
					href: "/docs/components/time-field",
					items: [],
				},
				{
					title: "Toast",
					href: "/docs/components/toast",
					items: [],
				},
				{
					title: "Toggle Button",
					href: "/docs/components/toggle-button",
					items: [],
				},
				{
					title: "Tooltip",
					href: "/docs/components/tooltip",
					items: [],
				},
			],
		},
	],
};
