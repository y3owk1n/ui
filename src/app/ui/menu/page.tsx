"use client";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";

import {
	Menu,
	MenuCollection,
	MenuHeader,
	MenuItem,
	MenuItemCheckbox,
	MenuItemRadio,
	MenuKeyboard,
	MenuPopover,
	MenuSection,
	MenuSeparator,
	MenuTrigger,
	SubmenuTrigger,
} from "@/components/ui/menu";
import {
	ChevronRight,
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MenuIcon,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";
import { useState } from "react";
import { type Selection } from "react-aria-components";

const dynamicData = [
	{
		name: "Left Panel",
		id: "left",
		children: [{ id: 1, name: "Final Copy (1)" }],
	},
	{
		name: "Right Panel",
		id: "right",
		children: [
			{ id: 2, name: "index.ts" },
			{ id: 3, name: "package.json" },
			{ id: 4, name: "license.txt" },
		],
	},
];
const dynamicSubmenuData = [
	{ id: "cut", name: "Cut" },
	{ id: "copy", name: "Copy" },
	{ id: "delete", name: "Delete" },
	{
		id: "share",
		name: "Share",
		children: [
			{ id: "sms", name: "SMS" },
			{ id: "twitter", name: "Twitter" },
			{
				id: "email",
				name: "Email",
				children: [
					{ id: "work", name: "Work" },
					{ id: "personal", name: "Personal" },
				],
			},
		],
	},
];

export default function MenuPage() {
	const [selected, setSelected] = useState<Selection>(new Set(["status"]));

	return (
		<div className="grid gap-4">
			<Preview>
				<div className="flex flex-wrap gap-4">
					<MenuTrigger>
						<Button aria-label="Menu" variant="outline" size="icon">
							<MenuIcon className="h-4 w-4" />
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
					<MenuTrigger>
						<Button variant="outline">Full Example</Button>
						<MenuPopover placement="top" className="min-w-[8rem]">
							<Menu className="w-56">
								<MenuSection>
									<MenuHeader separator>
										My Accounts
									</MenuHeader>
									<MenuItem>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
										<MenuKeyboard className="ml-auto">
											⇧⌘P
										</MenuKeyboard>
									</MenuItem>
									<MenuItem>
										<CreditCard className="mr-2 h-4 w-4" />
										<span>Billing</span>
										<MenuKeyboard className="ml-auto">
											⌘B
										</MenuKeyboard>
									</MenuItem>
									<MenuItem>
										<Settings className="mr-2 h-4 w-4" />
										<span>Settings</span>
										<MenuKeyboard className="ml-auto">
											⌘S
										</MenuKeyboard>
									</MenuItem>
									<MenuItem>
										<Keyboard className="mr-2 h-4 w-4" />
										<span>Keyboard shortcuts</span>
										<MenuKeyboard className="ml-auto">
											⌘K
										</MenuKeyboard>
									</MenuItem>
								</MenuSection>
								<MenuSeparator />
								<MenuSection>
									<MenuItem>
										<Users className="mr-2 h-4 w-4" />
										<span>Team</span>
									</MenuItem>
									<SubmenuTrigger>
										<MenuItem>
											<UserPlus className="mr-2 h-4 w-4" />
											<span>Invite users</span>
											<ChevronRight className="ml-auto h-4 w-4" />
										</MenuItem>
										<MenuPopover className="min-w-[8rem]">
											<Menu>
												<MenuItem>
													<Mail className="mr-2 h-4 w-4" />
													<span>Email</span>
												</MenuItem>
												<MenuItem>
													<MessageSquare className="mr-2 h-4 w-4" />
													<span>Message</span>
												</MenuItem>
												<MenuSeparator />
												<MenuItem>
													<PlusCircle className="mr-2 h-4 w-4" />
													<span>More...</span>
												</MenuItem>
											</Menu>
										</MenuPopover>
									</SubmenuTrigger>
									<MenuItem>
										<Plus className="mr-2 h-4 w-4" />
										<span>New Team</span>
										<MenuKeyboard className="ml-auto">
											⌘+T
										</MenuKeyboard>
									</MenuItem>
								</MenuSection>
								<MenuSeparator />
								<MenuItem>
									<Github className="mr-2 h-4 w-4" />
									<span>GitHub</span>
								</MenuItem>
								<MenuItem>
									<LifeBuoy className="mr-2 h-4 w-4" />
									<span>Support</span>
								</MenuItem>
								<MenuItem>
									<Cloud className="mr-2 h-4 w-4" />
									<span>API</span>
								</MenuItem>
								<MenuSeparator />
								<MenuItem>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
									<MenuKeyboard className="ml-auto">
										⇧⌘Q
									</MenuKeyboard>
								</MenuItem>
							</Menu>
						</MenuPopover>
					</MenuTrigger>
					<MenuTrigger>
						<Button variant="outline">Multiple Selection</Button>
						<MenuPopover
							placement="bottom"
							className="min-w-[8rem]"
						>
							<Menu
								selectionMode="multiple"
								selectedKeys={selected}
								onSelectionChange={setSelected}
								className="w-56"
								disabledKeys={["activity"]}
							>
								<MenuSection>
									<MenuHeader separator>
										Appearance
									</MenuHeader>
									<MenuItemCheckbox id="status">
										Status Bar
									</MenuItemCheckbox>
									<MenuItemCheckbox id="activity">
										Activity Bar
									</MenuItemCheckbox>
									<MenuItemCheckbox id="panel">
										Panel
									</MenuItemCheckbox>
								</MenuSection>
							</Menu>
						</MenuPopover>
					</MenuTrigger>
					<MenuTrigger>
						<Button variant="outline">Single Selection</Button>
						<MenuPopover
							placement="bottom"
							className="min-w-[8rem]"
						>
							<Menu
								selectionMode="single"
								selectedKeys={selected}
								onSelectionChange={setSelected}
								className="w-56"
							>
								<MenuSection>
									<MenuHeader separator>
										Panel Position
									</MenuHeader>
									<MenuItemRadio id="top">Top</MenuItemRadio>
									<MenuItemRadio id="bottom">
										Bottom
									</MenuItemRadio>
									<MenuItemRadio id="right">
										Right
									</MenuItemRadio>
								</MenuSection>
							</Menu>
						</MenuPopover>
					</MenuTrigger>
					<MenuTrigger>
						<Button variant="outline">Dynamic</Button>
						<MenuPopover className="min-w-[8rem]">
							<Menu
								items={dynamicData}
								selectionMode="multiple"
								selectedKeys={selected}
								onSelectionChange={setSelected}
							>
								{(section) => (
									<MenuSection>
										<MenuHeader>{section.name}</MenuHeader>
										<MenuCollection
											items={section.children}
										>
											{(item) => (
												<MenuItemCheckbox>
													{item.name}
												</MenuItemCheckbox>
											)}
										</MenuCollection>
									</MenuSection>
								)}
							</Menu>
						</MenuPopover>
					</MenuTrigger>
					<MenuTrigger>
						<Button variant="outline">Dynamic (Submenu)</Button>
						<MenuPopover className="min-w-[8rem]">
							<Menu
								items={dynamicSubmenuData}
								onAction={(key) =>
									typeof window !== "undefined"
										? alert(key)
										: console.log(key)
								}
							>
								{function renderSubmenu(item) {
									if (item.children) {
										return (
											<SubmenuTrigger>
												<MenuItem key={item.name}>
													{item.name}{" "}
													<ChevronRight className="ml-auto h-4 w-4" />
												</MenuItem>
												<MenuPopover className="min-w-[8rem]">
													<Menu items={item.children}>
														{(item) =>
															renderSubmenu(item)
														}
													</Menu>
												</MenuPopover>
											</SubmenuTrigger>
										);
									} else {
										return (
											<MenuItem key={item.name}>
												{item.name}
											</MenuItem>
										);
									}
								}}
							</Menu>
						</MenuPopover>
					</MenuTrigger>
				</div>
			</Preview>
		</div>
	);
}
