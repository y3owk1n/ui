"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to debounce a value.
 *
 * @param  value - The value to debounce.
 * @param  wait - The amount of time to wait before setting the value.
 * @param  options - Options object.
 * @param  leading - Whether to set the value immediately.
 * @param  callback - What to do after the value debounced.
 * @returns  - The debounced value and a function to cancel the debounce.
 */
export function useDebouncedValue<T>(
	value: T,
	wait: number,
	options: { leading?: boolean } = { leading: false },
	callback?: (value: T) => void,
): [T, () => void] {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const mountedRef = useRef(false);
	const timeoutRef = useRef<number | undefined>();
	const cooldownRef = useRef(false);

	/**
	 * Function to cancel the debounce.
	 */
	const cancel = (): void => {
		window.clearTimeout(timeoutRef.current);
	};

	useEffect(() => {
		if (mountedRef.current) {
			if (!cooldownRef.current && options.leading) {
				cooldownRef.current = true;
				setDebouncedValue(value);
			} else {
				cancel();
				timeoutRef.current = window.setTimeout(() => {
					cooldownRef.current = false;
					setDebouncedValue(value);
				}, wait);
			}
		}
	}, [value, options.leading, wait, callback]);

	useEffect(() => {
		mountedRef.current = true;
		return cancel;
	}, []);

	useEffect(() => {
		if (callback) callback(debouncedValue);
	}, [callback, debouncedValue]);

	return [debouncedValue, cancel];
}
