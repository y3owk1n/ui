"use client";
import Ripple from "@/components/ripple";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/ui/button";
import { Link } from "react-aria-components";

export default function Home() {
	return (
		<div className="relative grid h-[calc(100vh-5rem-3.5rem)] place-items-center overflow-hidden">
			<Ripple />
			<div className="container isolate px-6 lg:px-8">
				<div className="mx-auto max-w-2xl">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
							Mine UI.
						</h1>
						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							My own implementation for Shadcn UI on top of
							react-aria + some other components that I used in my
							projects.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-4">
							<Link
								href="/docs"
								className={cn(
									buttonVariants({
										size: "sm",
									}),
								)}
							>
								Get Started
							</Link>
							<Link
								href={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
								className={cn(
									buttonVariants({
										variant: "link",
										size: "sm",
									}),
								)}
							>
								Github
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
