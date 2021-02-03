import * as React from "react";
import Interactable from "./Interactions";
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

type _sizes = "small" | "medium" | "large" | "normal";

/**
 * Properties shared amongst editable/interactable elements
 */
export interface EditableProps {
  actor?: Interactable;
  disabled?: boolean;
  onClick?: <T extends HTMLElement>(e: React.MouseEvent<T>) => void;
  onKeyDown?: <T extends HTMLElement>(e: React.KeyboardEvent<T>) => void;
  onKeyUp?: <T extends HTMLElement>(e: React.KeyboardEvent<T>) => void;
  readonly?: boolean;
  rounded?: boolean;
  isSize?: _sizes;
}

/**
 * Wrapper for generic input fields
 * @param children Field to be controlled
 * @param horizontal Label position is horizontal -- Defaults to false
 * @param loading Adds rotating graphic to input -- Defaults to false
 * @param name Label name
 * @param size Change the size -- "small" | "medium" | "large" | "normal"
 */
export const ControlField = ({
  children,
  horizontal = false,
  loading = false,
  name,
  size,
}: {
  children: JSX.Element | JSX.Element[];
  horizontal?: boolean;
  loading?: boolean;
  name: string;
  size?: _sizes;
}): JSX.Element => {
  const _label = <label className='label'>{name}</label>
  return (
    <div className={`field ${ifElseBlank(horizontal, 'is-horizontal')}`}>
      {horizontal ? <div className='field-label is-normal'>{_label}</div> : _label}
      <div className='field-body'>
        <div className={`control ${ifElseBlank(loading, 'is-loading')} ${ifElseBlank(exists(size), `is-${size}`)}`}>
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
 * @param stringProp Exisitng property, may or may not exist. Will also reject an empty string.
 * @param defaultValue Default value to prepend
 * @returns Finished string
 */
export const stringPropCombineDefaulter = (
  stringProp: string | undefined,
  defaultValue: string
): string =>
  (exists(stringProp) && stringProp !== '') ? `${defaultValue} ${stringProp}` : defaultValue;