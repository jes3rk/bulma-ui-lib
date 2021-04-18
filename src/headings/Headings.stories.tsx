import { Meta, Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { H1, H2, H3, H4, H5, H6, HeadingProps } from "./Headings"

export default {
	title: "Headings",
	component: H1,
} as Meta

export const Base: Story<HeadingProps> = (args) => (
	<div>
		<H1 {...args}>Heading 1</H1>
		<H2 {...args}>Heading 2</H2>
		<H3 {...args}>Heading 3</H3>
		<H4 {...args}>Heading 4</H4>
		<H5 {...args}>Heading 5</H5>
		<H6 {...args}>Heading 6</H6>
	</div>
)
Base.storyName = "Headings"
