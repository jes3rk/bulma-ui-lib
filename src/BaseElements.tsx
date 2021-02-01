import * as React from "react";
import { exists, ifElseBlank } from "./publicUtilities";

/**
 * Properties shared amongst all HTML elements
 */
export interface BaseHTMLProps {
  "aria-label"?: string;
  className?: string;
  "data-testid"?: string;
  name?: string;
  title?: string;
}

/**
 * Properties shared amongst editable/interactable elements
 */
export interface EditableProps {
  disabled?: boolean;
  readonly?: boolean;
}

/**
 * Wrapper for generic input fields
 * @param children Field to be controlled
 * @param horizontal Label position is horizontal -- Defaults to false
 * @param name Label name
 * @returns
 */
export const ControlField = ({
  children,
  horizontal = false,
  name
}: {
  children: JSX.Element | JSX.Element[];
  horizontal?: boolean;
  name: string;
}): JSX.Element => {
  const _label = <label className='label'>{name}</label>
  return (
    <div className={`field ${ifElseBlank(horizontal, 'is-horizontal')}`}>
      {horizontal ? <div className='field-label is-normal'>{_label}</div> : _label}
      <div className='field-body'>
        <div className='control'>
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Automatically check if a value exists and return a default if it does not
 * @param prop Value to check
 * @param defaultValue Value to replace if prop doesn't exist
 * @returns prop if exists else defaultValue
 */
export const propDefaulter = function<T>(
  prop: T | undefined,
  defaultValue: T
): T {return exists(prop) ? prop : defaultValue};

/**
 * Automatically prepend a default value to a string property
 * @param stringProp Exisitng property, may or may not exist
 * @param defaultValue Default value to prepend
 * @returns Finished string
 */
export const stringPropCombineDefaulter = (
  stringProp: string | undefined,
  defaultValue: string
): string =>
  exists(stringProp) ? `${defaultValue} ${stringProp}` : defaultValue;
