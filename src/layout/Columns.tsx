import * as React from "react";
import { BaseHTMLProps, stringPropCombineDefaulter } from "../BaseElements";

export interface ColProps extends BaseHTMLProps {
  children?: JSX.Element | JSX.Element[];
}

export const Column = (props: ColProps): JSX.Element => {
  const _props: ColumnContainerProps = { ...props };
  _props.className = stringPropCombineDefaulter(_props.className, "column");
  return <div {..._props}>{props.children}</div>;
};

export interface ColumnContainerProps extends BaseHTMLProps {
  children?: JSX.Element | JSX.Element[];
}

export const ColumnContainer = (props: ColumnContainerProps): JSX.Element => {
  const _props: ColumnContainerProps = { ...props };
  _props.className = stringPropCombineDefaulter(_props.className, "columns");
  return <div {..._props}>{props.children}</div>;
};
