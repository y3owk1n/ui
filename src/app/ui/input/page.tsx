"use client";
import { BorderGroup } from "@/components/ui/border-group";
import { Button } from "@/components/ui/button";
import { DateField, DateInput, DateSegment } from "@/components/ui/date-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberField } from "@/components/ui/number-field";
import { SearchField, SearchFieldInput } from "@/components/ui/search-field";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<TextField>
				<Label>Email</Label>
				<Input type="email" placeholder="Email..." />
			</TextField>
			<DateField>
				<Label>Date</Label>
				<DateInput>
					{(segment) => <DateSegment segment={segment} />}
				</DateInput>
			</DateField>
			<SearchField>
				<Label>Search</Label>
				<SearchFieldInput placeholder="Search by name..." />
			</SearchField>
			<TextField>
				<Label>Remarks</Label>
				<TextArea rows={5} placeholder="Write something here..." />
			</TextField>
			<NumberField>
				<Label>Quantity</Label>
				<BorderGroup>
					<Button variant="outline" slot="decrement">
						-
					</Button>
					<Input placeholder="Number only..." />
					<Button variant="outline" slot="increment">
						+
					</Button>
				</BorderGroup>
			</NumberField>
		</div>
	);
}
