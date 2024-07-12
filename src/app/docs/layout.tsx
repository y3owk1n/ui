import { DocsSidebarNav } from "@/components/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";

interface DocsLayoutProps {
	children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
	return (
		<div className="border-b">
			<div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
				<aside className="fixed top-14 z-30 -ml-2 mb-4 hidden w-full shrink-0 py-6 pr-6 md:sticky md:block lg:py-8">
					<ScrollArea showShadow className="h-[calc(100vh-7rem)]">
						<DocsSidebarNav config={docsConfig} />
					</ScrollArea>
				</aside>
				{children}
			</div>
		</div>
	);
}
