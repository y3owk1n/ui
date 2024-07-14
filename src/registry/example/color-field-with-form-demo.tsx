import { Button } from "@/registry/ui/button";
import { parseColor } from "@/registry/ui/color";
import { ColorField } from "@/registry/ui/color-field";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form";
import { Input } from "@/registry/ui/input";
import { useToast } from "@/registry/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { type Color, useLocale } from "react-aria-components";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
	color: z.custom<Color>().refine((color) => color.toHexInt() > 0, {
		message: "Please enter color",
	}),
});

export default function ColorFieldWithFormDemo() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			color: parseColor("hsl(0, 100%, 50%)"),
		},
	});

	const toast = useToast();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success("You submitted the following values:", {
			description: (
				<pre className="mt-2 min-w-[340px] rounded-md p-4">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	const color = form.watch("color");

	const { locale } = useLocale();

	const colorChannels = React.useMemo(() => {
		return color.getColorChannels();
	}, [color]);

	const colorSpace = React.useMemo(() => {
		return color.getColorSpace();
	}, [color]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid max-w-[400px] gap-2">
					<FormField
						control={form.control}
						name="color"
						render={({ field, fieldState }) => (
							<FormItem>
								<ColorField
									{...field}
									colorSpace={colorSpace}
									isDisabled={field.disabled}
									isInvalid={fieldState.invalid}
									className="w-full max-w-lg"
								>
									<FormLabel>Background Color</FormLabel>

									<FormControl>
										<Input placeholder="#000" />
									</FormControl>
									<FormDescription>
										Any color that you like
									</FormDescription>
									<FormMessage />
								</ColorField>
							</FormItem>
						)}
					/>
					<div className="flex gap-2">
						{colorChannels.map((channel) => (
							<FormField
								key={channel}
								control={form.control}
								name="color"
								render={({ field, fieldState }) => (
									<FormItem>
										<ColorField
											{...field}
											onChange={(e) => {
												const hexInt = e?.toHexInt();
												if (hexInt === 0) {
													form.resetField("color");
													return;
												}
												field.onChange(e);
											}}
											colorSpace={colorSpace}
											channel={channel}
											isDisabled={field.disabled}
											isInvalid={fieldState.invalid}
											className="w-full max-w-lg"
										>
											<FormLabel>
												{color.getChannelName(
													channel,
													locale,
												)}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={color.getChannelName(
														channel,
														locale,
													)}
												/>
											</FormControl>
											<FormMessage />
										</ColorField>
									</FormItem>
								)}
							/>
						))}
					</div>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
