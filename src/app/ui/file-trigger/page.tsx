"use client";
import Preview from "@/components/preview";
import { Button } from "@/registry/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card";
import { FileItems, FileTrigger } from "@/registry/ui/file-trigger";

export default function FileTriggerPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<FileTrigger acceptedFileTypes={["image/*"]}>
					<div className="grid gap-2">
						<div>
							<Button>Upload image</Button>
						</div>
						<FileItems>
							{(files) => (
								<Card>
									<CardHeader>
										<CardTitle>File</CardTitle>
									</CardHeader>
									<CardContent>
										{files.map((file) => (
											<CardDescription key={file}>
												{file}
											</CardDescription>
										))}
									</CardContent>
								</Card>
							)}
						</FileItems>
					</div>
				</FileTrigger>
			</Preview>

			<Preview>
				<FileTrigger>
					<div className="grid gap-2">
						<div>
							<Button>Upload file</Button>
						</div>
						<FileItems>
							{(files) => (
								<Card>
									<CardHeader>
										<CardTitle>File</CardTitle>
									</CardHeader>
									<CardContent>
										{files.map((file) => (
											<CardDescription key={file}>
												{file}
											</CardDescription>
										))}
									</CardContent>
								</Card>
							)}
						</FileItems>
					</div>
				</FileTrigger>
			</Preview>
			<Preview>
				<FileTrigger allowsMultiple>
					<div className="grid gap-2">
						<div>
							<Button>Upload file(s)</Button>
						</div>
						<FileItems>
							{(files) => (
								<Card>
									<CardHeader>
										<CardTitle>Files</CardTitle>
									</CardHeader>
									<CardContent>
										{files.map((file) => (
											<CardDescription key={file}>
												{file}
											</CardDescription>
										))}
									</CardContent>
								</Card>
							)}
						</FileItems>
					</div>
				</FileTrigger>
			</Preview>
			<Preview>
				<FileTrigger acceptDirectory>
					<div className="grid gap-2">
						<div>
							<Button>Upload directory</Button>
						</div>
						<FileItems>
							{(files) => (
								<Card>
									<CardHeader>
										<CardTitle>Files</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid gap-1">
											{files.map((file) => (
												<CardDescription key={file}>
													{file}
												</CardDescription>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</FileItems>
					</div>
				</FileTrigger>
			</Preview>
		</div>
	);
}
