"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import {
	DialogContent,
	DialogOverlay,
	DialogTrigger,
} from "@/registry/ui/dialog";
import { Keyboard } from "@/registry/ui/keyboard";
import {
	ListBox,
	ListBoxCollection,
	ListBoxHeader,
	ListBoxItem,
	ListBoxSection,
} from "@/registry/ui/list-box";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { SearchField, SearchFieldInput } from "@/registry/ui/search-field";
import { Separator } from "@/registry/ui/separator";
import { type Selection } from "react-stately";

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

	const [isCollectionFocused, setIsCollectionFocused] = React.useState(false);

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
				setCurrentSearchTerm("");
				setIsCollectionFocused(false);
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
			<DialogTrigger
				isOpen={open}
				onOpenChange={() => {
					setCurrentSearchTerm("");
					setIsCollectionFocused(false);
					setOpen((open) => !open);
				}}
			>
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
					<Keyboard
						className="absolute right-[0.3rem] top-[0.3rem] hidden sm:flex"
						modifier="⌘"
					>
						K
					</Keyboard>
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
							<SearchFieldInput placeholder="Search Docs..." />
						</SearchField>
						<ScrollArea
							orientation="vertical"
							className="max-h-[400px]"
						>
							<ListBox
								onFocus={() => {
									setIsCollectionFocused(true);
								}}
								onBlur={() => {
									setIsCollectionFocused(false);
								}}
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
						<Separator className="my-4" />
						<div className="flex gap-4 text-xs text-muted-foreground">
							<div className="flex items-center gap-2">
								<Keyboard>TAB</Keyboard>
								Cycle focus
							</div>
							{isCollectionFocused ? (
								<>
									<div className="flex items-center gap-2">
										<Keyboard modifier="⬆⬇" />
										Up & Down
									</div>
									<div className="flex items-center gap-2">
										<Keyboard modifier="↵" />
										Open link
									</div>
								</>
							) : null}
						</div>
					</DialogContent>
				</DialogOverlay>
			</DialogTrigger>
		</>
	);
}
