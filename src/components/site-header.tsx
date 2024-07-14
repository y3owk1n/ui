"use client";

import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import { Link } from "react-aria-components";
import { CommandMenu } from "./command-menu";
import { ModeToggle } from "./dark-mode-toggle";
import { Icons } from "./icons";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center">
				<MainNav />
				<MobileNav />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<CommandMenu />
					</div>
					<nav className="flex items-center">
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({
									variant: "ghost",
									size: "icon",
								}),
							)}
						>
							<Icons.gitHub className="h-4 w-4" />
							<span className="sr-only">GitHub</span>
						</Link>
						<Link
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({
									variant: "ghost",
									size: "icon",
								}),
							)}
						>
							<Icons.twitter className="h-3 w-3 fill-current" />
							<span className="sr-only">Twitter</span>
						</Link>
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
