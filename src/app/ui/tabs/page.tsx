import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { TextField } from "@/components/ui/text-field";

export default function TabsPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<Tabs
					defaultSelectedKey="account"
					className="w-full max-w-[400px]"
				>
					<TabList
						aria-label="account selector"
						className="grid w-full grid-cols-2"
					>
						<Tab id="account">Account</Tab>
						<Tab id="password">Password</Tab>
					</TabList>
					<TabPanel id="account">
						<Card>
							<CardHeader>
								<CardTitle>Account</CardTitle>
								<CardDescription>
									Make changes to your account here. Click
									save when you&apos;re done.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<TextField>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										defaultValue="Pedro Duarte"
									/>
								</TextField>
								<TextField>
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										defaultValue="@peduarte"
									/>
								</TextField>
							</CardContent>
							<CardFooter>
								<Button>Save changes</Button>
							</CardFooter>
						</Card>
					</TabPanel>
					<TabPanel id="password">
						<Card>
							<CardHeader>
								<CardTitle>Password</CardTitle>
								<CardDescription>
									Change your password here. After saving,
									you&apos;ll be logged out.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<TextField>
									<Label htmlFor="current">
										Current password
									</Label>
									<Input id="current" type="password" />
								</TextField>
								<TextField>
									<Label htmlFor="new">New password</Label>
									<Input id="new" type="password" />
								</TextField>
							</CardContent>
							<CardFooter>
								<Button>Save password</Button>
							</CardFooter>
						</Card>
					</TabPanel>
				</Tabs>
			</Preview>
		</div>
	);
}
