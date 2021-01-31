import * as React from "react";
import { exists } from "./publicUtilities";

export interface BaseHTMLProps {
  "aria-label"?: string;
  className?: string;
  name?: string;
  title?: string;
}

/**
 * Automatically prepend a default value to a string property
 * @param stringProp Exisitng property, may or may not exist
 * @param defaultValue Default value to prepend
 * @returns Finished string
 */
export const stringPropDefaulter = (
  stringProp: string | undefined,
  defaultValue: string
): string =>
  exists(stringProp) ? `${defaultValue} ${stringProp}` : defaultValue;
