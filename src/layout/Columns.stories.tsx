import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ColumnContainer, ColumnContainerProps } from "./Columns";

export default {
  title: "Layout/Column Container",
  component: ColumnContainer,
} as Meta;

export const Base: Story<ColumnContainerProps> = (args) => (
  <ColumnContainer {...args}></ColumnContainer>
);
Base.storyName = 'Column Container';