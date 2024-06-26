"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

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
