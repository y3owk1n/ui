import { BorderGroup } from "@/registry/ui/border-group";
import { Button } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/registry/ui/menu";
import { ChevronDown } from "lucide-react";

export default function BorderGroupDemo() {
	return (
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
						<MenuItem id="create">Create a merge commit</MenuItem>
						<MenuItem id="squash">Squash and merge</MenuItem>
						<MenuItem id="rebase">Rebase and merge</MenuItem>
					</Menu>
				</MenuPopover>
			</MenuTrigger>
		</BorderGroup>
	);
}
