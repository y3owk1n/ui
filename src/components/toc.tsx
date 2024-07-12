"use client";

import * as React from "react";

import { useMounted } from "@/hooks/use-mounted";
import { type TocEntry } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
	toc: TocEntry[];
}

export function DashboardTableOfContents({ toc }: TocProps) {
	const itemIds = React.useMemo(
		() =>
			toc
				? toc
						.flatMap((item) => [
							item.url,
							item?.items?.map((item) => item.url),
						])
						.flat()
						.filter(Boolean)
						.map((id) => id?.split("#")[1])
				: [],
		[toc],
	) as string[];
	const activeHeading = useActiveItem(itemIds);
	const mounted = useMounted();

	if (!toc || !mounted) {
		return null;
	}

	return (
		<div className="space-y-2">
			<p className="font-medium">On This Page</p>
			<Tree tree={toc} activeItem={activeHeading ?? undefined} />
		</div>
	);
}

function useActiveItem(itemIds: string[]) {
	const [activeId, setActiveId] = React.useState<string | null>(null);

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: `0% 0% -80% 0%` },
		);

		itemIds?.forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			itemIds?.forEach((id) => {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, [itemIds]);

	return activeId;
}

interface TreeProps {
	tree: TocEntry[];
	level?: number;
	activeItem?: string;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
	return tree.length && level < 3 ? (
		<ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
			{tree.map((item, index) => {
				return (
					<li key={index} className={cn("mt-0 pt-2")}>
						<a
							href={item.url}
							className={cn(
								"inline-block no-underline transition-colors hover:text-foreground",
								item.url === `#${activeItem}`
									? "font-medium text-foreground"
									: "text-muted-foreground",
							)}
						>
							{item.title}
						</a>
						{item.items?.length ? (
							<Tree
								tree={item.items}
								level={level + 1}
								activeItem={activeItem}
							/>
						) : null}
					</li>
				);
			})}
		</ul>
	) : null;
}
