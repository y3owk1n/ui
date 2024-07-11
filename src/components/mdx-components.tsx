"use client";

import { type NpmCommands } from "@/types/unist";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Callout } from "@/components/callout";
// import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { ComponentExample } from "@/components/component-example";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { CopyButton, CopyNpmCommandButton } from "@/components/copy-button";
import { FrameworkDocs } from "@/components/framework-docs";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { ScrollArea } from "@/registry/ui/scroll-area";
// import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio";
import { Tab, TabList, TabPanel, Tabs } from "@/registry/ui/tabs";

const components = {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Alert,
	AlertTitle,
	AlertDescription,
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={cn(
				"font-heading mt-2 scroll-m-20 text-4xl font-bold",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={cn(
				"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={cn(
				"font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={cn(
				"font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h5
			className={cn(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h6
			className={cn(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a
			className={cn(
				"font-medium underline underline-offset-4",
				className,
			)}
			{...props}
		/>
	),
	p: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<li className={cn("mt-2", className)} {...props} />
	),
	blockquote: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLElement>) => (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img className={cn("rounded-md", className)} alt={alt} {...props} />
	),
	hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="my-4 md:my-8" {...props} />
	),
	table: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto rounded-lg">
			<table
				className={cn("w-full overflow-hidden rounded-lg", className)}
				{...props}
			/>
		</div>
	),
	tr: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={cn("m-0 border-t p-0", className)} {...props} />
	),
	th: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={cn(
				"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={cn(
				"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({
		className,
		__rawString__,
		__npmCommand__,
		__yarnCommand__,
		__pnpmCommand__,
		__bunCommand__,
		__withMeta__,
		__src__,
		...props
	}: React.HTMLAttributes<HTMLPreElement> & {
		__rawString__?: string;
		__withMeta__?: boolean;
		__src__?: string;
	} & NpmCommands) => {
		return (
			<div className="relative">
				<pre
					className={cn(
						"mb-4 mt-6 h-full max-h-[650px] overflow-x-auto rounded-lg border py-4",
						className,
					)}
					{...props}
				/>
				{__rawString__ && !__npmCommand__ && (
					<CopyButton
						value={__rawString__}
						src={__src__}
						className={cn(
							"absolute right-4 top-4",
							__withMeta__ && "top-16",
						)}
					/>
				)}
				{__npmCommand__ &&
					__yarnCommand__ &&
					__pnpmCommand__ &&
					__bunCommand__ && (
						<CopyNpmCommandButton
							commands={{
								__npmCommand__,
								__yarnCommand__,
								__pnpmCommand__,
								__bunCommand__,
							}}
							className={cn(
								"absolute right-4 top-4",
								__withMeta__ && "top-16",
							)}
						/>
					)}
			</div>
		);
	},
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={cn(
				"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
				className,
			)}
			{...props}
		/>
	),
	Image,
	Callout,
	ComponentPreview,
	ComponentExample,
	ComponentSource,
	// AspectRatio,
	CodeBlockWrapper: ({ ...props }) => (
		<div className="rounded-md border" {...props} />
	),
	Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	Steps: ({ ...props }) => (
		<div
			className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
			{...props}
		/>
	),
	Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
		<Tabs className={cn("relative mt-6 w-full", className)} {...props} />
	),
	TabList: ({
		className,
		...props
	}: React.ComponentProps<typeof TabList>) => (
		<TabList
			className={cn(
				// "w-full justify-start rounded-none border-b bg-transparent p-0",
				className,
			)}
			{...props}
		/>
	),
	Tab: ({ className, ...props }: React.ComponentProps<typeof Tab>) => (
		<Tab
			className={cn(
				// "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
				className,
			)}
			{...props}
		/>
	),
	TabPanel: ({
		className,
		...props
	}: React.ComponentProps<typeof TabPanel>) => (
		<TabPanel
			className={cn(
				// "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
				className,
			)}
			{...props}
		/>
	),
	FrameworkDocs: ({
		className,
		...props
	}: React.ComponentProps<typeof FrameworkDocs>) => (
		<FrameworkDocs className={cn(className)} {...props} />
	),
	Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn(
				"font-medium underline underline-offset-4",
				className,
			)}
			{...props}
		/>
	),
	LinkedCard: ({
		className,
		...props
	}: React.ComponentProps<typeof Link>) => (
		<Link
			className={cn(
				"flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
				className,
			)}
			{...props}
		/>
	),
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
