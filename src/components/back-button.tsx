"use client";
import { Button } from "@/registry/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();

	return (
		<Button
			className="mb-4"
			variant="link"
			size="unstyled"
			onPress={() => router.back()}
		>
			<ChevronLeft className="mr-2 size-4" />
			Back
		</Button>
	);
}
