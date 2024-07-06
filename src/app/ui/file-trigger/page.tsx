"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FileItems, FileTrigger } from "@/components/ui/file-trigger";

export default function FileTriggerPage() {
	return (
		<div className="grid gap-4">
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
		</div>
	);
}
