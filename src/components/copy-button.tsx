"use client";

import type { NpmCommands } from "@/types/unist";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/registry/ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@/registry/ui/menu";

interface CopyButtonProps extends ButtonProps {
	value: string;
	src?: string;
}

function oldSchoolCopy(text: string) {
	const tempTextArea = document.createElement("textarea");
	tempTextArea.value = text;
	document.body.appendChild(tempTextArea);
	tempTextArea.select();
	document.execCommand("copy");
	document.body.removeChild(tempTextArea);
}

export async function copyToClipboardWithMeta(value: string) {
	try {
		if (navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(value);
		} else {
			throw new Error("writeText not supported");
		}
	} catch (error) {
		oldSchoolCopy(value);
	}
}

export function CopyButton({
	value,
	className,
	src,
	variant = "ghost",
	...props
}: CopyButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	}, [hasCopied]);

	return (
		<Button
			size="icon"
			variant={variant}
			className={cn("relative z-10 h-6 w-6", className)}
			onPress={async () => {
				await copyToClipboardWithMeta(value);
				setHasCopied(true);
			}}
			{...props}
		>
			<span className="sr-only">Copy</span>
			{hasCopied ? (
				<CheckIcon className="h-3 w-3" />
			) : (
				<ClipboardIcon className="h-3 w-3" />
			)}
		</Button>
	);
}

interface CopyWithClassNamesProps extends ButtonProps {
	value: string;
	classNames: string;
	className?: string;
}

export function CopyWithClassNames({
	value,
	classNames,
	className,
	...props
}: CopyWithClassNamesProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	}, [hasCopied]);

	const copyToClipboard = React.useCallback(async (value: string) => {
		await copyToClipboardWithMeta(value);
		setHasCopied(true);
	}, []);

	return (
		<MenuTrigger>
			<Button size="icon" variant="ghost" className={cn(className)}>
				{hasCopied ? (
					<CheckIcon className="h-3 w-3" />
				) : (
					<ClipboardIcon className="h-3 w-3" />
				)}
				<span className="sr-only">Copy</span>
			</Button>
			<MenuPopover placement="bottom" className="min-w-[8rem]">
				<Menu className="w-56">
					<MenuItem onAction={() => copyToClipboard(value)}>
						Component
					</MenuItem>
					<MenuItem onAction={() => copyToClipboard(classNames)}>
						Classname
					</MenuItem>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	);
}

interface CopyNpmCommandButtonProps extends ButtonProps {
	commands: Required<NpmCommands>;
}

export function CopyNpmCommandButton({
	commands,
	className,
	...props
}: CopyNpmCommandButtonProps) {
	const [hasCopied, setHasCopied] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setHasCopied(false);
		}, 2000);
	}, [hasCopied]);

	const copyCommand = React.useCallback(
		async (value: string, pm: "npm" | "pnpm" | "yarn" | "bun") => {
			await copyToClipboardWithMeta(value);
			setHasCopied(true);
		},
		[],
	);

	return (
		<MenuTrigger>
			<Button
				size="icon"
				variant="ghost"
				className={cn("h-6 w-6", className)}
			>
				{hasCopied ? (
					<CheckIcon className="h-3 w-3" />
				) : (
					<ClipboardIcon className="h-3 w-3" />
				)}
				<span className="sr-only">Copy</span>
			</Button>
			<MenuPopover placement="bottom" className="min-w-[8rem]">
				<Menu className="w-56">
					<MenuItem
						onAction={() =>
							copyCommand(commands.__npmCommand__, "npm")
						}
					>
						npm
					</MenuItem>
					<MenuItem
						onAction={() =>
							copyCommand(commands.__yarnCommand__, "yarn")
						}
					>
						yarn
					</MenuItem>
					<MenuItem
						onAction={() =>
							copyCommand(commands.__pnpmCommand__, "pnpm")
						}
					>
						pnpm
					</MenuItem>
					<MenuItem
						onAction={() =>
							copyCommand(commands.__bunCommand__, "bun")
						}
					>
						bun
					</MenuItem>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	);
}
