"use client";

import * as React from "react";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
	src: string;
}

export function ComponentSource({
	children,
	className,
	...props
}: ComponentSourceProps) {
	return { children };
}
