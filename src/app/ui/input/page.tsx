"use client";
import Preview from "@/components/preview";
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
	OtpFieldGroupSeparator,
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

export default function InputPage() {
	return (
		<div className="grid gap-4">
			<Preview>
				<TextField className="w-full max-w-lg" isDisabled>
					<Label>Email</Label>
					<Input type="email" placeholder="Email..." />
					<FieldDescription>
						This is your public email
					</FieldDescription>
					<FieldError />
				</TextField>
			</Preview>
			<Preview>
				<div className="grid w-full max-w-lg gap-4">
					<OtpField type="text">
						<Label>OTP text</Label>
						<OtpFieldGroupRoot>
							<OtpFieldGroup>
								<OtpFieldInput index={0} />
								<OtpFieldInput index={1} />
								<OtpFieldInput index={2} />
							</OtpFieldGroup>
							<OtpFieldGroupSeparator />
							<OtpFieldGroup>
								<OtpFieldInput index={3} />
								<OtpFieldInput index={4} />
								<OtpFieldInput index={5} />
							</OtpFieldGroup>
						</OtpFieldGroupRoot>
						<FieldDescription>
							Fill in the code you got
						</FieldDescription>
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
						<FieldDescription>
							Fill in the code you got
						</FieldDescription>
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
						<FieldDescription>
							Fill in the code you got
						</FieldDescription>
						<FieldError />
					</OtpField>
				</div>
			</Preview>
			<Preview>
				<PasswordField className="w-full max-w-lg">
					<Label>Password</Label>
					<PasswordFieldInput />
					<FieldDescription>This is your password</FieldDescription>
					<FieldError />
				</PasswordField>
			</Preview>
			<Preview>
				<DateField className="w-full max-w-lg">
					<Label>Date</Label>
					<DateInput>
						{(segment) => <DateSegment segment={segment} />}
					</DateInput>
					<FieldDescription>Date of your choice</FieldDescription>
					<FieldError />
				</DateField>
			</Preview>
			<Preview>
				<TimeField className="w-full max-w-lg">
					<Label>Time</Label>
					<TimeInput>
						{(segment) => <TimeSegment segment={segment} />}
					</TimeInput>
					<FieldDescription>Time of your choice</FieldDescription>
					<FieldError />
				</TimeField>
			</Preview>
			<Preview>
				<SearchField className="w-full max-w-lg">
					<Label>Search</Label>
					<SearchFieldInput placeholder="Search by name..." />
					<FieldDescription>Search nicely!</FieldDescription>
					<FieldError />
				</SearchField>
			</Preview>
			<Preview>
				<TextField className="w-full max-w-lg">
					<Label>Remarks</Label>
					<TextArea rows={5} placeholder="Write something here..." />
					<FieldDescription>Any more info</FieldDescription>
					<FieldError />
				</TextField>
			</Preview>
			<Preview>
				<NumberField className="w-full max-w-lg">
					<Label>Quantity</Label>
					<BorderGroup>
						<NumberMinusButton />
						<NumberInput placeholder="3" />
						<NumberPlusButton />
					</BorderGroup>
					<FieldDescription>Any more info</FieldDescription>
					<FieldError />
				</NumberField>
			</Preview>
		</div>
	);
}
