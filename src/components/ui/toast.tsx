"use client";

import * as React from "react";

import {
	type ToastOptions,
	type ToastState,
	type ToastStateProps,
	useToastState,
} from "@react-stately/toast";

import {
	type AriaToastProps,
	type AriaToastRegionProps,
	useToast as _useToast,
	useToastRegion,
} from "@react-aria/toast";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import {
	AlertCircle,
	AlertTriangle,
	CheckCircle2,
	Loader2,
	X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { Button } from "./button";

type ToastType = "default" | "success" | "destructive" | "info" | "warning";

type ToastContent = {
	promise?: () => Promise<void>;
	loading?: string;
	error?: string | ((data: Error) => string);
	success?: string | ((data: object) => string);
	title: string;
	description?: string;
	type: ToastType;
	icon?: React.ReactNode;
	allowDismiss?: boolean;
	action?: {
		cb: () => void;
		label: React.ReactNode;
	};
};

interface ToastProviderContextType<T> extends ToastState<T> {}

const ToastProviderContext = React.createContext<
	ToastProviderContextType<any> | undefined
>(undefined);

interface ToastProviderProps extends ToastStateProps {
	children: React.ReactNode;
}

function ToastProvider<T extends ToastContent>({
	children,
	maxVisibleToasts = 5,
	hasExitAnimation = true,
	...props
}: ToastProviderProps) {
	const state = useToastState<T>({
		maxVisibleToasts,
		hasExitAnimation,
	});

	return (
		<ToastProviderContext.Provider value={state}>
			{children}
			{state.visibleToasts.length > 0 &&
				createPortal(
					<ToastRegion {...props} state={state} />,
					document.body,
				)}
		</ToastProviderContext.Provider>
	);
}

type ToastOptionsExt = Omit<ToastOptions, "timeout"> & {
	description?: React.ReactNode;
	icon?: React.ReactNode;
	timeout?: ToastOptions["timeout"] | null;
	allowDismiss?: boolean;
	action?: {
		cb: () => void;
		label: React.ReactNode;
	};
};

type ToastPromiseOptions<T> = ToastOptionsExt & {
	loading: string;
	error: string | ((data: Error) => string);
	success: string | ((data: T) => string);
};

function getDefaultIcons(type: ToastType) {
	switch (type) {
		case "default":
			return undefined;
		case "destructive":
			return <AlertCircle className="size-4" />;
		case "info":
			return <AlertCircle className="size-4" />;
		case "warning":
			return <AlertTriangle className="size-4" />;
		case "success":
			return <CheckCircle2 className="size-4" />;

		default:
			return undefined;
	}
}

function useToast() {
	const state = React.useContext(ToastProviderContext);

	if (!state) throw Error("useToast must be use within ToastProvider");

	const action = React.useCallback(
		(type: ToastType, title: string, options?: ToastOptionsExt) => {
			return state?.add(
				{
					title,
					description: options?.description,
					type,
					icon: options?.icon ?? getDefaultIcons(type),
					action: options?.action,
					allowDismiss: options?.allowDismiss ?? true,
				},
				{
					priority: options?.priority,
					timeout:
						options?.timeout === null
							? undefined
							: options?.timeout ?? 5000,
					onClose: options?.onClose,
				},
			);
		},
		[state],
	);

	const promiseAction = React.useCallback(
		<T extends object>(
			promise: () => Promise<T>,
			options?: ToastPromiseOptions<T>,
		) => {
			return state?.add(
				{
					action: options?.action,
					allowDismiss: options?.allowDismiss ?? true,
					promise,
					loading: options?.loading,
					error: options?.error,
					success: options?.success,
				},
				{
					priority: options?.priority,
					timeout:
						options?.timeout === null
							? undefined
							: options?.timeout ?? 5000,
					onClose: options?.onClose,
				},
			);
		},
		[state],
	);

	const { add, ...rest } = state;

	// promise: <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => string | number;

	const _state = {
		default: (title: string, options?: ToastOptionsExt) =>
			action("default", title, options),
		success: (title: string, options?: ToastOptionsExt) =>
			action("success", title, options),
		info: (title: string, options?: ToastOptionsExt) =>
			action("info", title, options),
		warning: (title: string, options?: ToastOptionsExt) =>
			action("warning", title, options),
		destructive: (title: string, options?: ToastOptionsExt) =>
			action("destructive", title, options),
		promise: <T extends object>(
			promise: () => Promise<T>,
			options?: ToastPromiseOptions<T>,
		) => promiseAction(promise, options),
		...rest,
	};

	return _state;
}

interface ToastRegionProps<T> extends AriaToastRegionProps {
	state: ToastState<T>;
}

function ToastRegion<T extends ToastContent>({
	state,
	...props
}: ToastRegionProps<T>) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { regionProps } = useToastRegion(props, state, ref);

	return (
		<div
			{...regionProps}
			ref={ref}
			className="fixed bottom-0 right-0 m-8 grid gap-4"
		>
			{state.visibleToasts.map((toast) => (
				<Toast key={toast.key} toast={toast} state={state} />
			))}
		</div>
	);
}

interface ToastProps<T extends ToastContent>
	extends AriaToastProps<T>,
		VariantProps<typeof toastVariants> {
	className?: string;
	state: ToastState<T>;
}

const toastVariants = cva(
	"relative w-full rounded-lg border p-4 shadow-md duration-200 data-[animation=exiting]:duration-300 data-[animation=entering]:animate-in data-[animation=exiting]:animate-out data-[animation=entering]:fade-in-0 data-[animation=exiting]:fade-out-0 data-[animation=entering]:zoom-in-95 data-[animation=exiting]:zoom-out-95 data-[animation=entering]:slide-in-from-bottom data-[animation=exiting]:slide-out-to-bottom md:w-[350px] [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*:not(button)]:pl-7",
	{
		variants: {
			variant: {
				default:
					"border-foreground/10 bg-background text-card-foreground",
				destructive:
					"border-destructive-foreground/10 bg-destructive text-destructive-foreground",
				success:
					"border-success-foreground/10 bg-success text-success-foreground",
				info: "border-info-foreground/10 bg-info text-info-foreground",
				warning:
					"border-warning-foreground/10 bg-warning text-warning-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Toast<T extends ToastContent>({
	state,
	className,
	...props
}: ToastProps<T>) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { toastProps, titleProps, descriptionProps, closeButtonProps } =
		_useToast(props, state, ref);

	const promise = props.toast.content.promise;

	const id = React.useId();

	const query = useQuery(`toast-promise-${id}`, promise!, {
		enabled: promise && typeof promise === "function",
		retry: false,
	});

	const content = React.useMemo(() => {
		if (!!promise) {
			if (query.isLoading) {
				return {
					title: props.toast.content.loading ?? "Loading...",
					type: "default" as ToastType,
					icon: <Loader2 className="size-4 animate-spin" />,
				};
			}
			if (query.isError) {
				return {
					title:
						typeof props.toast.content.error === "function"
							? props.toast.content.error(query.error as Error)
							: props.toast.content.error ?? "Error",
					type: "destructive" as ToastType,
					icon: <AlertCircle className="size-4" />,
				};
			}
			return {
				title:
					typeof props.toast.content.success === "function"
						? props.toast.content.success(
								query.data as unknown as object,
							)!
						: props.toast.content.success,
				type: "success" as ToastType,
				icon: <CheckCircle2 className="size-4" />,
			};
		}

		return {
			title: props.toast.content.title,
			description: props.toast.content.description,
			type: props.toast.content.type,
			icon: props.toast.content.icon,
			action: props.toast.content.action,
			allowDismiss: props.toast.content.allowDismiss,
		};
	}, [props.toast.content, query, promise]);

	return (
		<div
			{...toastProps}
			ref={ref}
			className={cn(toastVariants({ variant: content.type, className }))}
			data-animation={props.toast.animation}
			onAnimationEnd={() => {
				// Remove the toast when the exiting animation completes.
				if (props.toast.animation === "exiting") {
					state.remove(props.toast.key);
				}
			}}
		>
			{content.icon}
			<div className="flex items-center gap-2">
				<div className="flex-1">
					<div {...titleProps} className="h-4 text-sm font-semibold">
						{content.title}
					</div>
					{content.description && (
						<div
							{...descriptionProps}
							className="mt-1 text-sm [&_p]:leading-relaxed"
						>
							{content.description}
						</div>
					)}
				</div>

				{content.action && (
					<Button size="xs" onPress={content.action.cb}>
						{content.action.label}
					</Button>
				)}
			</div>
			{content.allowDismiss && (
				<Button
					{...closeButtonProps}
					variant={
						content.type === "default" ? "outline" : content.type
					}
					size="unstyled"
					className="absolute -left-3 -top-3 rounded-full p-1 ring-offset-background transition-opacity"
				>
					<X className="size-3" />
				</Button>
			)}
		</div>
	);
}

export { ToastProvider, ToastRegion, Toast, useToast };
