import { BackButton } from "@/components/back-button";

export default function UiLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="container pt-8">
			<BackButton />
			{children}
		</div>
	);
}
