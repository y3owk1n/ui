"use client";
import Preview from "@/components/preview";
import { BorderGroup } from "@/registry/ui/border-group";
import { ColorField } from "@/registry/ui/color-field";
import { DateField, DateInput, DateSegment } from "@/registry/ui/date-field";
import { FieldDescription } from "@/registry/ui/field-description";
import { FieldError } from "@/registry/ui/field-error";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import {
	NumberField,
	NumberInput,
	NumberMinusButton,
	NumberPlusButton,
} from "@/registry/ui/number-field";
import {
	OtpField,
	OtpFieldGroup,
	OtpFieldGroupRoot,
	OtpFieldGroupSeparator,
	OtpFieldInput,
} from "@/registry/ui/otp-field";
import {
	PasswordField,
	PasswordFieldInput,
} from "@/registry/ui/password-field";
import { SearchField, SearchFieldInput } from "@/registry/ui/search-field";
import { TextArea } from "@/registry/ui/text-area";
import { TextField } from "@/registry/ui/text-field";
import { TimeField, TimeInput, TimeSegment } from "@/registry/ui/time-field";

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
			<Preview>
				<div className="grid gap-2">
					<ColorField className="w-full max-w-lg">
						<Label>Background Color</Label>
						<Input placeholder="#000" />
						<FieldDescription>
							Any color that you like
						</FieldDescription>
						<FieldError />
					</ColorField>
					<div className="flex gap-2">
						<ColorField
							colorSpace="hsl"
							channel="hue"
							className="w-full max-w-lg"
						>
							<Label>Hue</Label>
							<Input />
							<FieldError />
						</ColorField>
						<ColorField
							colorSpace="hsl"
							channel="saturation"
							className="w-full max-w-lg"
						>
							<Label>Saturation</Label>
							<Input />
							<FieldError />
						</ColorField>
						<ColorField
							colorSpace="hsl"
							channel="lightness"
							className="w-full max-w-lg"
						>
							<Label>Lightness</Label>
							<Input />
							<FieldError />
						</ColorField>
					</div>
				</div>
			</Preview>
		</div>
	);
}
