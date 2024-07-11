import { Button } from "@/registry/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card";
import { FieldError } from "@/registry/ui/field-error";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectPopover,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select";
import { TextField } from "@/registry/ui/text-field";

export default function CardDemo() {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>
					Deploy your new project in one-click.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<TextField className="w-full">
							<Label>Name</Label>
							<Input
								type="email"
								placeholder="Name of your project"
							/>
							<FieldError />
						</TextField>
						<Select placeholder="Select a framework">
							<Label htmlFor="framework">Framework</Label>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectPopover>
								<SelectContent>
									<SelectItem textValue="next">
										Next.js
									</SelectItem>
									<SelectItem textValue="sveltekit">
										SvelteKit
									</SelectItem>
									<SelectItem textValue="astro">
										Astro
									</SelectItem>
									<SelectItem textValue="nuxt">
										Nuxt.js
									</SelectItem>
								</SelectContent>
							</SelectPopover>
						</Select>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Cancel</Button>
				<Button>Deploy</Button>
			</CardFooter>
		</Card>
	);
}
