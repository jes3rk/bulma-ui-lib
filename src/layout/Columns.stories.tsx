import * as React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { ColumnContainer } from "./Columns"
import { BaseLayoutProps } from "../BaseElements"

export default {
	title: "Layout/Column Container",
	component: ColumnContainer,
} as Meta

export const Base: Story<BaseLayoutProps> = (args) => (
	<ColumnContainer {...args}></ColumnContainer>
)
Base.storyName = "Column Container"
