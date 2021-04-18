import * as React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { Button, ButtonProps, PrimaryButton, SecondaryButton } from "./Button"

export default {
	title: "Inputs/Buttons",
	component: Button,
} as Meta

export const Base: Story<ButtonProps> = (args) => (
	<div>
		<PrimaryButton {...args} />
		<SecondaryButton {...args} />
		<Button {...args} />
	</div>
)
