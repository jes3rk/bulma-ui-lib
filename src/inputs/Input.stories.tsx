import * as React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { Input, InputProps } from "./Input"

export default {
	title: "Inputs/Base",
	component: Input,
} as Meta

export const Base: Story<InputProps> = (args) => <Input {...args} />
