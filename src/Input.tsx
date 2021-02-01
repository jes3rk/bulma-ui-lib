import * as React from "react";
import { BaseHTMLProps, stringPropDefaulter } from "./BaseElements";

export interface InputProps extends BaseHTMLProps {
  type?: "number" | "password" | "text";
  value?: number | string;
}

export const Input = (props: InputProps): JSX.Element => {
  const _props = {...props};
  _props.className = stringPropDefaulter(_props.className, 'input');
  return <input {..._props} />;
};
