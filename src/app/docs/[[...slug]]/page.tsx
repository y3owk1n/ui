import { notFound } from "next/navigation";
import { docs as allDocs } from "velite/generated";

import "@/styles/mdx.css";
import type { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Mdx } from "@/components/mdx-components";
import { DocsPager } from "@/components/pager";
import { DashboardTableOfContents } from "@/components/toc";
import { siteConfig } from "@/config/site";
import { absoluteUrl, cn } from "@/lib/utils";
import { badgeVariants } from "@/registry/ui/badge";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";

interface DocPageProps {
	params: {
		slug: string[];
	};
}

async function getDocFromParams({ params }: DocPageProps) {
	const slug = params.slug?.join("/") || "";
	const doc = allDocs.find((doc) => doc.slugAsParams === slug);

	if (!doc) {
		return null;
	}

	return doc;
}

export async function generateMetadata({
	params,
}: DocPageProps): Promise<Metadata> {
	const doc = await getDocFromParams({ params });

	if (!doc) {
		return {};
	}

	return {
		title: doc.title,
		description: doc.description,
		openGraph: {
			title: doc.title,
			description: doc.description,
			type: "article",
			url: absoluteUrl(doc.slug),
			images: [
				{
					url: siteConfig.ogImage,
					width: 1200,
					height: 630,
					alt: siteConfig.name,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: doc.title,
			description: doc.description,
			images: [siteConfig.ogImage],
			creator: "@shadcn",
		},
	};
}

export async function generateStaticParams(): Promise<
	DocPageProps["params"][]
> {
	return allDocs.map((doc) => ({
		slug: doc.slugAsParams.split("/"),
	}));
}

export default async function DocPage({ params }: DocPageProps) {
	const doc = await getDocFromParams({ params });

	if (!doc) {
		notFound();
	}

	return (
		<main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
			<div className="mx-auto w-full min-w-0">
				<div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
					<div className="truncate">Docs</div>
					<ChevronRightIcon className="h-3.5 w-3.5" />
					<div className="text-foreground">{doc.title}</div>
				</div>
				<div className="space-y-2">
					<h1
						className={cn(
							"scroll-m-20 text-3xl font-bold tracking-tight",
						)}
					>
						{doc.title}
					</h1>
					{doc.description && (
						<p className="text-base text-muted-foreground">
							<Balancer>{doc.description}</Balancer>
						</p>
					)}
				</div>
				{doc.links ? (
					<div className="flex items-center space-x-2 pt-4">
						{doc.links?.doc && (
							<Link
								href={doc.links.doc}
								target="_blank"
								rel="noreferrer"
								className={cn(
									badgeVariants({ variant: "secondary" }),
									"gap-1",
								)}
							>
								Docs
								<ExternalLinkIcon className="h-3 w-3" />
							</Link>
						)}
						{doc.links?.api && (
							<Link
								href={doc.links.api}
								target="_blank"
								rel="noreferrer"
								className={cn(
									badgeVariants({ variant: "secondary" }),
									"gap-1",
								)}
							>
								API Reference
								<ExternalLinkIcon className="h-3 w-3" />
							</Link>
						)}
					</div>
				) : null}
				<div className="pb-12 pt-8">
					<Mdx code={doc.content} />
				</div>
				<DocsPager doc={doc} />
			</div>
			{doc.toc && (
				<div className="hidden text-sm xl:block">
					<div className="sticky top-14 mb-4 py-6 lg:py-8">
						<ScrollArea showShadow className="h-[calc(100vh-7rem)]">
							<DashboardTableOfContents toc={doc.toc} />
						</ScrollArea>
					</div>
				</div>
			)}
		</main>
	);
}
