import { Button } from "@/registry/ui/button";
import { Copy } from "lucide-react";

export default function ButtonIconDemo() {
	return (
		<Button size="icon" aria-label="copy">
			<Copy className="size-4" />
		</Button>
	);
}
