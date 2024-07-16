import { Button } from "@/registry/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card";
import { FileItems, FileTrigger } from "@/registry/ui/file-trigger";
import * as React from "react";

export default function FileTriggerDemo() {
	return (
		<FileTrigger acceptedFileTypes={["image/*"]}>
			<div className="grid gap-2">
				<Button className="mx-auto w-fit">Upload image</Button>
				<FileItems className="w-full min-w-[200px]">
					{(files) => (
						<Card>
							<CardHeader>
								<CardTitle>Image</CardTitle>
							</CardHeader>
							<CardContent>
								{files.map((file) => (
									<CardDescription key={file.path}>
										{file.path}
									</CardDescription>
								))}
							</CardContent>
						</Card>
					)}
				</FileItems>
			</div>
		</FileTrigger>
	);
}
