"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { docsConfig } from "@/config/docs";
import {
	ComboBox,
	ComboBoxCollection,
	ComboBoxContent,
	ComboBoxHeader,
	ComboBoxItem,
	ComboBoxPopover,
	ComboBoxSection,
	ComboBoxTrigger,
} from "@/registry/ui/combo-box";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { type Key } from "react-aria-components";

const sidebarRows = docsConfig.sidebarNav
	.filter((item) => item.title.toLowerCase() === "components")
	.map((navItem) => ({
		name: navItem.title,
		children: navItem.items.map((item) => ({
			id: item.href,
			name: item.title,
		})),
	}));

const rows = [...sidebarRows];

export function CommandMenu() {
	const router = useRouter();
	const ref = React.useRef<HTMLInputElement>(null);

	const [key] = React.useState<Key | null>(null);

	const runCommand = React.useCallback((command: () => unknown) => {
		command();
		ref.current?.blur();
	}, []);

	return (
		<ComboBox
			menuTrigger="focus"
			className="w-full max-w-lg"
			defaultItems={rows}
			selectedKey={key}
			onSelectionChange={(e) => {
				runCommand(() => {
					router.push(e as string);
				});
			}}
			aria-label="search docs"
		>
			<ComboBoxTrigger ref={ref} placeholder="Search documentation" />
			<ComboBoxPopover className="border">
				<ScrollArea className="max-h-[400px]">
					<ComboBoxContent<(typeof rows)[number]>>
						{(section) => (
							<ComboBoxSection id={section.name}>
								<ComboBoxHeader>{section.name}</ComboBoxHeader>
								<ComboBoxCollection items={section.children}>
									{(item) => (
										<ComboBoxItem textValue={item.name}>
											{item.name}
										</ComboBoxItem>
									)}
								</ComboBoxCollection>
							</ComboBoxSection>
						)}
					</ComboBoxContent>
				</ScrollArea>
			</ComboBoxPopover>
		</ComboBox>
	);
}
