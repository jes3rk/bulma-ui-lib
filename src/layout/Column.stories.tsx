import * as React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { Column, ColProps } from "./Columns"

export default {
	title: "Layout/Column",
	component: Column,
} as Meta

export const Base: Story<ColProps> = (args) => <Column {...args}></Column>
Base.storyName = "Column"
