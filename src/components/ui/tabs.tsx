"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
	Tab as _Tab,
	TabList as _TabList,
	type TabListProps as _TabListProps,
	TabPanel as _TabPanel,
	type TabPanelProps as _TabPanelProps,
	type TabProps as _TabProps,
	Tabs as _Tabs,
} from "react-aria-components";

const Tabs = _Tabs;

interface TabListProps<T extends object> extends _TabListProps<T> {}

function TabList<T extends object>({ className, ...props }: TabListProps<T>) {
	return (
		<_TabList
			className={(values) =>
				cn(
					"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
					typeof className === "function"
						? className(values)
						: className,
				)
			}
			{...props}
		/>
	);
}

interface TabProps extends _TabProps {}

const Tab = React.forwardRef<HTMLDivElement, TabProps>(
	({ className, ...props }, ref) => {
		return (
			<_Tab
				className={(values) =>
					cn(
						"inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
						values.isSelected &&
							"bg-background text-foreground shadow-sm",
						values.isDisabled && "pointer-events-none opacity-50",
						values.isFocused && "outline-none",
						values.isFocusVisible &&
							"outline-none ring-2 ring-ring ring-offset-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			/>
		);
	},
);
Tab.displayName = "Tab";

interface TabPanelProps extends _TabPanelProps {}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
	({ className, ...props }, ref) => {
		return (
			<_TabPanel
				className={(values) =>
					cn(
						"mt-2 ring-offset-background",
						values.isFocusVisible &&
							"outline-none ring-2 ring-ring ring-offset-2",
						typeof className === "function"
							? className(values)
							: className,
					)
				}
				ref={ref}
				{...props}
			/>
		);
	},
);
TabPanel.displayName = "TabPanel";

export { Tabs, TabList, Tab, TabPanel };
