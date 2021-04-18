import * as React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { TextInput, TextInputProps } from "./Input"

export default {
	title: "Inputs/Text Input",
	component: TextInput,
} as Meta

export const Text: Story<TextInputProps> = (args) => <TextInput {...args} />
Text.storyName = "Text Input"
