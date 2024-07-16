"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import {
	FileTrigger as _FileTrigger,
	type FileTriggerProps as _FileTriggerProps,
} from "react-aria-components";

interface FileTriggerContextType {
	files: UploadedFile[];
}

const FileTriggerContext = React.createContext<
	FileTriggerContextType | undefined
>(undefined);

type FileTriggerProps = _FileTriggerProps;

type UploadedFile = {
	path: string;
	size: number;
	type: string;
};

const FileTrigger = React.forwardRef<HTMLInputElement, FileTriggerProps>(
	(props, ref) => {
		const [files, setFiles] = React.useState<UploadedFile[]>([]);

		return (
			<FileTriggerContext.Provider value={{ files }}>
				<_FileTrigger
					onSelect={(e) => {
						if (e) {
							const fileList = [...e].map((file) => ({
								path:
									file.webkitRelativePath !== ""
										? file.webkitRelativePath
										: file.name,
								size: file.size,
								type: file.type,
							}));
							setFiles(fileList);
						}
					}}
					ref={ref}
					{...props}
				/>
			</FileTriggerContext.Provider>
		);
	},
);
FileTrigger.displayName = "FileTrigger";

const FileItems = React.forwardRef<
	HTMLDivElement,
	Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
		children: (files: UploadedFile[]) => JSX.Element;
	}
>(({ className, children, ...props }, ref) => {
	const context = React.useContext(FileTriggerContext);
	if (!context) {
		throw new Error("FileItems must be used within a FileTrigger");
	}

	const { files } = context;

	if (files.length === 0) return null;

	return (
		<div
			ref={ref}
			className={cn(
				"mb-1 font-medium leading-none tracking-tight",
				className,
			)}
			{...props}
		>
			{typeof children === "function" ? children(files) : children}
		</div>
	);
});
FileItems.displayName = "FileItems";

export { FileTrigger, type FileTriggerProps, FileItems };
