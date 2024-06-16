export default function UiLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="container my-8">{children}</div>;
}
