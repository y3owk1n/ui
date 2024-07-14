import { siteConfig } from "@/config/site";

export function SiteFooter() {
	return (
		<footer className="grid h-20 items-center">
			<div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
				<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
					Modified by{" "}
					<a
						href={siteConfig.links.twitter}
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4"
					>
						y3owk1n
					</a>
					. Template by{" "}
					<a
						href="https://ui.shadcn.com"
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4"
					>
						Shadcn UI
					</a>
					. Source code{" "}
					<a
						href={siteConfig.links.github}
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
