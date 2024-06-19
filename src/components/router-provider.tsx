"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { RouterProvider as _RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>["push"]>[1]
		>;
	}
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<_RouterProvider navigate={(e) => router.push(e)}>
			{children}
		</_RouterProvider>
	);
}
