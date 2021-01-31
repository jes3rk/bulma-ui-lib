import * as React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ColumnContainer, ColumnContainerProps } from "./Columns";

export default {
  title: "Layout/Columns",
  component: ColumnContainer,
} as Meta;

export const Container: Story<ColumnContainerProps> = () => (
  <ColumnContainer></ColumnContainer>
);
