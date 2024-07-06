"use client";
import { Suspense } from "react";
import PaginationExample from "./pagination-example";

export default function PaginationPage() {
	return (
		<Suspense fallback={<span>Loading...</span>}>
			<PaginationExample />
		</Suspense>
	);
}
