import * as React from "react";
import { BaseHTMLProps, ControlField, EditableProps, propDefaulter, stringPropCombineDefaulter } from "./BaseElements";

export interface InputProps extends BaseHTMLProps, EditableProps {
  placeholder?: string;
  type?: "number" | "password" | "text";
  value?: number | string;
}

/**
 * Generic Input type
 * @param props 
 * @returns JSX input element
 */
export const Input = (props: InputProps): JSX.Element => {
  const _props = {...props};
  _props.className = stringPropCombineDefaulter(_props.className, 'input');
  return <input {..._props} />;
};

export interface TextInputProps extends InputProps {
  horizontal?: boolean
  type?: 'text'|'password';
}

/**
 * Resuable Text/Password input field
 * @param props 
 */
export const TextInput = (props: TextInputProps): JSX.Element => {
  const _props = {...props};
  _props.type = propDefaulter(_props.type, 'text');
  return (
    <ControlField
      horizontal={_props.horizontal}
      name={_props.name}
    >
      <Input {..._props} />
    </ControlField>
  )
}