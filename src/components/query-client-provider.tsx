"use client";

import * as React from "react";
import {
	QueryClient,
	QueryClientProvider as _QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export function QueryClientProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<_QueryClientProvider client={queryClient}>
			{children}
		</_QueryClientProvider>
	);
}
