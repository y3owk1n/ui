"use client";
import Preview from "@/components/preview";
import { Suspense } from "react";
import PaginationExample from "./pagination-example";

export default function PaginationPage() {
	return (
		<Preview>
			<Suspense fallback={<span>Loading...</span>}>
				<PaginationExample />
			</Suspense>
		</Preview>
	);
}
