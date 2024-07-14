import { Button } from "@/components/ui/button";
import {
	ComboBox,
	ComboBoxContent,
	ComboBoxItem,
	ComboBoxLabel,
	ComboBoxPopover,
	ComboBoxTrigger,
} from "@/registry/ui/combo-box";
import { Loader } from "lucide-react";
import * as React from "react";
import { useQuery } from "react-query";

type Response = {
	results: Person[];
};

type Person = {
	id: string;
	name: string;
};

export default function ComboBoxAsyncDemo() {
	const { isLoading, error, data, refetch, isRefetching } = useQuery({
		queryKey: ["data"],
		queryFn: () =>
			fetch("https://swapi.py4e.com/api/people").then(
				(res) => res.json() as Promise<Response>,
			),
	});

	if (isLoading || isRefetching) {
		return <Loader className="h-4 w-4 animate-spin" />;
	}

	if (error) {
		return <span>Error fetching data...</span>;
	}

	const formattedData = data?.results.map((item) => ({
		id: item.name,
		name: item.name,
	}));

	return (
		<div className="space-y-4">
			<ComboBox
				className="w-full max-w-[200px]"
				defaultItems={formattedData}
			>
				<ComboBoxLabel>Async Loading</ComboBoxLabel>
				<ComboBoxTrigger placeholder="Select something" />
				<ComboBoxPopover>
					<ComboBoxContent<Person>>
						{(item) => (
							<ComboBoxItem
								className="truncate text-left"
								textValue={item.name}
							>
								{item.name}
							</ComboBoxItem>
						)}
					</ComboBoxContent>
				</ComboBoxPopover>
			</ComboBox>
			<Button onPress={() => refetch()}>Refetch Data</Button>
		</div>
	);
}
