"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/registry/ui/button";

import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/registry/ui/menu";

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<>
			<MenuTrigger>
				<Button aria-label="Toggle theme" variant="outline" size="icon">
					<Sun className="absolute size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</Button>
				<MenuPopover className="">
					<Menu onAction={(val) => setTheme(val.toString())}>
						<MenuItem id="light">Light</MenuItem>
						<MenuItem id="dark">Dark</MenuItem>
						<MenuItem id="system">System</MenuItem>
					</Menu>
				</MenuPopover>
			</MenuTrigger>
		</>
	);
}
