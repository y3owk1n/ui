"use client";
import Preview from "@/components/preview";
import { BorderGroup } from "@/registry/ui/border-group";
import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/registry/ui/menu";
import { ChevronDown } from "lucide-react";

export default function BorderGroupPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<BorderGroup>
					<Button variant="outline">Create a merge commit</Button>

					<MenuTrigger>
						<Button aria-label="Menu" variant="outline" size="icon">
							<ChevronDown className="h-4 w-4" />
						</Button>
						<MenuPopover className="min-w-[8rem]">
							<Menu
								onAction={(key) =>
									typeof window !== "undefined"
										? alert(key)
										: console.log(key)
								}
							>
								<MenuItem id="create">
									Create a merge commit
								</MenuItem>
								<MenuItem id="squash">
									Squash and merge
								</MenuItem>
								<MenuItem id="rebase">
									Rebase and merge
								</MenuItem>
							</Menu>
						</MenuPopover>
					</MenuTrigger>
				</BorderGroup>
			</Preview>
			<Preview>
				<div className="flex flex-col gap-4">
					<BorderGroup>
						<Button variant="destructive">hello</Button>
						<Button>hello</Button>
						<Button variant="outline">hello</Button>
						<Button variant="destructive">hello</Button>
						<Button variant="destructive">hello</Button>
					</BorderGroup>
					<BorderGroup orientation="vertical">
						<Button variant="destructive">hello</Button>
						<Button>hello</Button>
						<Button variant="outline">hello</Button>
						<Button variant="destructive">hello</Button>
						<Button variant="destructive">hello</Button>
					</BorderGroup>
					<BorderGroup>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup orientation="vertical">
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup orientation="vertical">
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup orientation="vertical">
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup orientation="vertical">
						<Button variant="outline">Default</Button>
						<Button variant="outline">Default</Button>
					</BorderGroup>
					<BorderGroup orientation="vertical">
						<Button variant="outline">Default</Button>
					</BorderGroup>
				</div>
			</Preview>
		</div>
	);
}
