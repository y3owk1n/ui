import { type ReactNode } from "react";

export default function Preview({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-[350px] w-full items-center justify-center rounded-md border p-10">
			{children}
		</div>
	);
}
