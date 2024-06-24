import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseParamsToSet(param: string | null) {
	if (param) {
		const array = decodeURI(param).split(",");

		return new Set(array);
	}
}
