"use client";
import { BorderGroup } from "@/components/ui/border-group";
import { DateField, DateInput, DateSegment } from "@/components/ui/date-field";
import { FieldDescription } from "@/components/ui/field-description";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	NumberField,
	NumberInput,
	NumberMinusButton,
	NumberPlusButton,
} from "@/components/ui/number-field";
import {
	OtpField,
	OtpFieldGroup,
	OtpFieldGroupRoot,
	OtpFieldInput,
} from "@/components/ui/otp-field";
import {
	PasswordField,
	PasswordFieldInput,
} from "@/components/ui/password-field";
import { SearchField, SearchFieldInput } from "@/components/ui/search-field";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { TimeField, TimeInput, TimeSegment } from "@/components/ui/time-field";

export default function CheckboxPage() {
	return (
		<div className="grid gap-4">
			<TextField isDisabled>
				<Label>Email</Label>
				<Input type="email" placeholder="Email..." />
				<FieldDescription>This is your public email</FieldDescription>
				<FieldError />
			</TextField>
			<OtpField type="text">
				<Label>OTP text</Label>
				<OtpFieldGroupRoot>
					<OtpFieldGroup>
						<OtpFieldInput index={0} />
						<OtpFieldInput index={1} />
						<OtpFieldInput index={2} />
						<OtpFieldInput index={3} />
						<OtpFieldInput index={4} />
						<OtpFieldInput index={5} />
					</OtpFieldGroup>
				</OtpFieldGroupRoot>
				<FieldDescription>Fill in the code you got</FieldDescription>
				<FieldError />
			</OtpField>
			<OtpField type="numeric">
				<Label>OTP number</Label>
				<OtpFieldGroupRoot>
					<OtpFieldGroup>
						<OtpFieldInput index={0} />
						<OtpFieldInput index={1} />
						<OtpFieldInput index={2} />
						<OtpFieldInput index={3} />
						<OtpFieldInput index={4} />
						<OtpFieldInput index={5} />
					</OtpFieldGroup>
				</OtpFieldGroupRoot>
				<FieldDescription>Fill in the code you got</FieldDescription>
				<FieldError />
			</OtpField>
			<OtpField type="both">
				<Label>OTP Both</Label>
				<OtpFieldGroupRoot>
					<OtpFieldGroup>
						<OtpFieldInput index={0} />
						<OtpFieldInput index={1} />
						<OtpFieldInput index={2} />
						<OtpFieldInput index={3} />
						<OtpFieldInput index={4} />
						<OtpFieldInput index={5} />
					</OtpFieldGroup>
				</OtpFieldGroupRoot>
				<FieldDescription>Fill in the code you got</FieldDescription>
				<FieldError />
			</OtpField>
			<PasswordField>
				<Label>Password</Label>
				<PasswordFieldInput />
				<FieldDescription>This is your password</FieldDescription>
				<FieldError />
			</PasswordField>
			<DateField>
				<Label>Date</Label>
				<DateInput>
					{(segment) => <DateSegment segment={segment} />}
				</DateInput>
				<FieldDescription>Date of your choice</FieldDescription>
				<FieldError />
			</DateField>
			<TimeField>
				<Label>Time</Label>
				<TimeInput>
					{(segment) => <TimeSegment segment={segment} />}
				</TimeInput>
				<FieldDescription>Time of your choice</FieldDescription>
				<FieldError />
			</TimeField>
			<SearchField>
				<Label>Search</Label>
				<SearchFieldInput placeholder="Search by name..." />
				<FieldDescription>Search nicely!</FieldDescription>
				<FieldError />
			</SearchField>
			<TextField>
				<Label>Remarks</Label>
				<TextArea rows={5} placeholder="Write something here..." />
				<FieldDescription>Any more info</FieldDescription>
				<FieldError />
			</TextField>
			<NumberField>
				<Label>Quantity</Label>
				<BorderGroup>
					<NumberMinusButton />
					<NumberInput placeholder="3" />
					<NumberPlusButton />
				</BorderGroup>
				<FieldDescription>Any more info</FieldDescription>
				<FieldError />
			</NumberField>
		</div>
	);
}
