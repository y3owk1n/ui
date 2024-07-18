"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { docsConfig } from "@/config/docs";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { Button } from "@/registry/ui/button";
import { cn } from "@/lib/utils";
import {
	DialogContent,
	DialogOverlay,
	DialogTrigger,
} from "@/registry/ui/dialog";
import {
	ListBox,
	ListBoxCollection,
	ListBoxHeader,
	ListBoxItem,
	ListBoxSection,
} from "@/registry/ui/list-box";
import { type Selection } from "react-stately";
import { SearchField, SearchFieldInput } from "@/registry/ui/search-field";

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

	const [open, setOpen] = React.useState(false);

	const [selected] = React.useState<Selection>();

	const [currentSearchTerm, setCurrentSearchTerm] = React.useState("");

	const hasSearchFilter = Boolean(currentSearchTerm);

	const filteredData = React.useMemo(() => {
		let filteredRows = [...rows];
		if (!hasSearchFilter) return filteredRows;

		filteredRows = filteredRows
			.map((row) => {
				const filteredChildren = row.children.filter((child) =>
					child.name
						.toLowerCase()
						.includes(currentSearchTerm.toLowerCase()),
				);

				if (filteredChildren.length > 0) {
					return { ...row, children: filteredChildren };
				}

				return null;
			})
			.filter(Boolean) as typeof rows;

		return filteredRows;
	}, [currentSearchTerm, hasSearchFilter]);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
				if (
					(e.target instanceof HTMLElement &&
						e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return;
				}

				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<DialogTrigger isOpen={open} onOpenChange={setOpen}>
				<Button
					variant="outline"
					className={cn(
						"relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
					)}
					onPress={() => {
						setOpen(true);
					}}
				>
					<span className="hidden lg:inline-flex">
						Search documentation...
					</span>
					<span className="inline-flex lg:hidden">Search...</span>
					<kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
						<span className="text-xs">⌘</span>K
					</kbd>
				</Button>
				<DialogOverlay>
					<DialogContent closeButton={false}>
						<SearchField
							autoFocus
							value={currentSearchTerm}
							onChange={setCurrentSearchTerm}
							className="mb-4"
							aria-label="search docs"
						>
							<SearchFieldInput
								autoFocus
								placeholder="Search Docs..."
							/>
						</SearchField>
						<ScrollArea
							showShadow
							orientation="vertical"
							className="max-h-[400px]"
						>
							<ListBox
								renderEmptyState={() => "No results found."}
								dependencies={filteredData}
								key={filteredData.length}
								selectionMode="single"
								className="w-full max-w-lg"
								items={filteredData}
								selectedKeys={selected}
								onSelectionChange={(e) => {
									const set = new Set(e);
									const values = set.values();
									const array = Array.from(values);

									if (array.length === 1) {
										runCommand(() => {
											router.push(array[0] as string);
										});
									}
								}}
								aria-label="search docs"
							>
								{(section) => (
									<ListBoxSection id={section.name}>
										<ListBoxHeader>
											{section.name}
										</ListBoxHeader>
										<ListBoxCollection
											items={section.children}
										>
											{(item) => (
												<ListBoxItem
													textValue={item.name}
												>
													{item.name}
												</ListBoxItem>
											)}
										</ListBoxCollection>
									</ListBoxSection>
								)}
							</ListBox>
						</ScrollArea>
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
		</>
	);
}
