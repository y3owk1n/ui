import { type Registry } from "@/registry/schema";

export const ui: Registry = [
	{
		name: "accordion",
		type: "components:ui",
		dependencies: ["@radix-ui/react-accordion"],
		registryDependencies: ["button"],
		files: ["ui/accordion.tsx"],
	},
	{
		name: "alert",
		type: "components:ui",
		files: ["ui/alert.tsx"],
	},
	{
		name: "avatar",
		type: "components:ui",
		files: ["ui/avatar.tsx"],
	},
	{
		name: "badge",
		type: "components:ui",
		files: ["ui/badge.tsx"],
	},
	{
		name: "border-group",
		type: "components:ui",
		files: ["ui/border-group.tsx"],
	},
	{
		name: "button",
		type: "components:ui",
		files: ["ui/button.tsx"],
	},
	{
		name: "calendar",
		type: "components:ui",
		dependencies: ["@internationalized/date"],
		registryDependencies: ["button"],
		files: ["ui/calendar.tsx"],
	},
	{
		name: "card",
		type: "components:ui",
		files: ["ui/card.tsx"],
	},
	{
		name: "carousel",
		type: "components:ui",
		files: ["ui/carousel.tsx"],
		registryDependencies: ["button"],
		dependencies: ["embla-carousel-react"],
	},
	{
		name: "checkbox-group",
		type: "components:ui",
		files: ["ui/checkbox-group.tsx"],
		registryDependencies: ["checkbox", "label", "field-error"],
	},
	{
		name: "checkbox",
		type: "components:ui",
		files: ["ui/checkbox.tsx"],
	},
	{
		name: "color-field",
		type: "components:ui",
		files: ["ui/color-field.tsx"],
	},
	{
		name: "color",
		type: "components:ui",
		dependencies: ["slider"],
		registryDependencies: ["slider"],
		files: ["ui/color.tsx"],
	},
	{
		name: "combo-box",
		type: "components:ui",
		files: ["ui/combo-box.tsx"],
		registryDependencies: [
			"button",
			"input",
			"label",
			"list-box",
			"popover",
			"separator",
		],
	},
	{
		name: "date-field",
		type: "components:ui",
		files: ["ui/date-field.tsx"],
	},
	{
		name: "date-picker",
		type: "components:ui",
		files: ["ui/date-picker.tsx"],
		registryDependencies: ["button", "dialog", "popover"],
	},
	{
		name: "dialog",
		type: "components:ui",
		files: ["ui/dialog.tsx"],
		registryDependencies: ["button"],
	},
	{
		name: "drawer",
		type: "components:ui",
		dependencies: ["vaul", "@radix-ui/react-dialog"],
		files: ["ui/drawer.tsx"],
	},
	{
		name: "field-description",
		type: "components:ui",
		dependencies: ["vaul", "@radix-ui/react-dialog"],
		files: ["ui/field-description.tsx"],
	},
	{
		name: "field-error",
		type: "components:ui",
		dependencies: ["vaul", "@radix-ui/react-dialog"],
		files: ["ui/field-error.tsx"],
	},
	{
		name: "file-trigger",
		type: "components:ui",
		dependencies: ["vaul", "@radix-ui/react-dialog"],
		files: ["ui/file-trigger.tsx"],
	},
	{
		name: "form",
		type: "components:ui",
		dependencies: [
			"@radix-ui/react-label",
			"@radix-ui/react-slot",
			"@hookform/resolvers",
			"zod",
			"react-hook-form",
		],
		registryDependencies: ["button", "label"],
		files: ["ui/form.tsx"],
	},
	{
		name: "gallery",
		type: "components:ui",
		dependencies: ["@radix-ui/react-hover-card"],
		files: ["ui/gallery.tsx"],
	},
	{
		name: "grid-list",
		type: "components:ui",
		dependencies: ["@radix-ui/react-hover-card"],
		files: ["ui/grid-list.tsx"],
	},
	{
		name: "image-magnifier",
		type: "components:ui",
		dependencies: ["@radix-ui/react-hover-card"],
		files: ["ui/image-magnifier.tsx"],
	},
	{
		name: "input",
		type: "components:ui",
		files: ["ui/input.tsx"],
	},
	{
		name: "keyboard",
		type: "components:ui",
		dependencies: ["input-otp"],
		files: ["ui/keyboard.tsx"],
	},
	{
		name: "label",
		type: "components:ui",
		dependencies: ["@radix-ui/react-label"],
		files: ["ui/label.tsx"],
	},
	{
		name: "list-box",
		type: "components:ui",
		dependencies: ["@radix-ui/react-label"],
		files: ["ui/list-box.tsx"],
	},
	{
		name: "menu",
		type: "components:ui",
		dependencies: ["@radix-ui/react-menubar"],
		files: ["ui/menu.tsx"],
	},
	{
		name: "meter",
		type: "components:ui",
		dependencies: ["@radix-ui/react-navigation-menu"],
		files: ["ui/meter.tsx"],
	},
	{
		name: "number-field",
		type: "components:ui",
		dependencies: ["@radix-ui/react-navigation-menu"],
		files: ["ui/number-field.tsx"],
	},
	{
		name: "otp-field",
		type: "components:ui",
		dependencies: ["@radix-ui/react-navigation-menu"],
		files: ["ui/otp-field.tsx"],
	},
	{
		name: "pagination",
		type: "components:ui",
		registryDependencies: ["button"],
		files: ["ui/pagination.tsx"],
	},
	{
		name: "password-field",
		type: "components:ui",
		registryDependencies: ["button"],
		files: ["ui/password-field.tsx"],
	},
	{
		name: "popover",
		type: "components:ui",
		dependencies: ["@radix-ui/react-popover"],
		files: ["ui/popover.tsx"],
	},
	{
		name: "progress-bar",
		type: "components:ui",
		dependencies: ["@radix-ui/react-progress"],
		files: ["ui/progress-bar.tsx"],
	},
	{
		name: "progress-ring",
		type: "components:ui",
		dependencies: ["@radix-ui/react-progress"],
		files: ["ui/progress-ring.tsx"],
	},
	{
		name: "radio-group",
		type: "components:ui",
		dependencies: ["@radix-ui/react-radio-group"],
		files: ["ui/radio-group.tsx"],
	},
	{
		name: "responsive-dialog-drawer",
		type: "components:ui",
		dependencies: ["@radix-ui/react-radio-group"],
		files: ["ui/responsive-dialog-drawer.tsx"],
	},
	{
		name: "scroll-area",
		type: "components:ui",
		dependencies: ["@radix-ui/react-scroll-area"],
		files: ["ui/scroll-area.tsx"],
	},
	{
		name: "search-field",
		type: "components:ui",
		dependencies: ["@radix-ui/react-select"],
		files: ["ui/search-field.tsx"],
	},
	{
		name: "select",
		type: "components:ui",
		dependencies: ["@radix-ui/react-select"],
		files: ["ui/select.tsx"],
	},
	{
		name: "separator",
		type: "components:ui",
		dependencies: ["@radix-ui/react-separator"],
		files: ["ui/separator.tsx"],
	},
	{
		name: "sheet",
		type: "components:ui",
		dependencies: ["@radix-ui/react-dialog"],
		files: ["ui/sheet.tsx"],
	},
	{
		name: "skeleton",
		type: "components:ui",
		files: ["ui/skeleton.tsx"],
	},
	{
		name: "slider",
		type: "components:ui",
		dependencies: ["@radix-ui/react-slider"],
		files: ["ui/slider.tsx"],
	},
	{
		name: "switch",
		type: "components:ui",
		dependencies: ["@radix-ui/react-switch"],
		files: ["ui/switch.tsx"],
	},
	{
		name: "table",
		type: "components:ui",
		files: ["ui/table.tsx"],
	},
	{
		name: "tabs",
		type: "components:ui",
		dependencies: ["@radix-ui/react-tabs"],
		files: ["ui/tabs.tsx"],
	},
	{
		name: "text-area",
		type: "components:ui",
		files: ["ui/text-area.tsx"],
	},
	{
		name: "text-field",
		type: "components:ui",
		files: ["ui/text-field.tsx"],
	},
	{
		name: "time-field",
		type: "components:ui",
		files: ["ui/time-field.tsx"],
	},
	{
		name: "toast",
		type: "components:ui",
		dependencies: ["@radix-ui/react-toast"],
		files: ["ui/toast.tsx", "ui/use-toast.ts", "ui/toaster.tsx"],
	},
	{
		name: "toggle-button",
		type: "components:ui",
		dependencies: ["@radix-ui/react-toggle-group"],
		registryDependencies: ["toggle"],
		files: ["ui/toggle-button.tsx"],
	},
	{
		name: "tooltip",
		type: "components:ui",
		dependencies: ["@radix-ui/react-tooltip"],
		files: ["ui/tooltip.tsx"],
	},
];
