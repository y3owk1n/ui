"use client";

import { Index } from "@/__registry__";
import * as React from "react";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";
import { Tab, TabList, TabPanel, Tabs } from "@/registry/ui/tabs";
import { Loader } from "lucide-react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string;
	extractClassname?: boolean;
	extractedClassNames?: string;
	align?: "center" | "start" | "end";
	hideCode?: boolean;
}

export function ComponentPreview({
	name,
	children,
	className,
	extractClassname,
	extractedClassNames,
	align = "center",
	hideCode = false,
	...props
}: ComponentPreviewProps) {
	const Codes = React.Children.toArray(children) as React.ReactElement[];
	const Code = Codes[0];

	const Preview = React.useMemo(() => {
		const Component = Index[name]?.component;

		if (!Component) {
			return (
				<p className="text-sm text-muted-foreground">
					Component{" "}
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
						{name}
					</code>{" "}
					not found in registry.
				</p>
			);
		}

		return <Component />;
	}, [name]);

	const codeString = React.useMemo(() => {
		if (
			typeof Code?.props["data-rehype-pretty-code-figure"] !== "undefined"
		) {
			const [Button] = React.Children.toArray(
				Code.props.children,
			) as React.ReactElement[];
			return Button?.props?.value || Button?.props?.__rawString__ || null;
		}
	}, [Code]);

	return (
		<div
			className={cn(
				"group relative my-4 flex flex-col space-y-2",
				className,
			)}
			{...props}
		>
			<Tabs
				defaultSelectedKey="preview"
				className="relative mr-auto w-full"
			>
				{!hideCode && (
					<TabList className="">
						<Tab id="preview" className="">
							Preview
						</Tab>
						<Tab id="code" className="">
							Code
						</Tab>
					</TabList>
				)}
				<TabPanel id="preview" className="relative rounded-md border">
					<div className="flex items-center justify-end p-4">
						<div className="flex items-center gap-2">
							<CopyButton value={codeString} variant="ghost" />
						</div>
					</div>
					<div
						className={cn(
							"preview flex min-h-[350px] w-full justify-center p-10",
							{
								"items-center": align === "center",
								"items-start": align === "start",
								"items-end": align === "end",
							},
						)}
					>
						<React.Suspense
							fallback={
								<div className="flex w-full items-center justify-center text-sm text-muted-foreground">
									<Loader className="mr-2 h-4 w-4 animate-spin" />
									Loading...
								</div>
							}
						>
							{Preview}
						</React.Suspense>
					</div>
				</TabPanel>
				<TabPanel id="code">
					<div className="flex flex-col space-y-4">
						<div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
							{Code}
						</div>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}
