import * as React from "react"
import Interactable from "./Interactions"
import { exists, ifElseBlank } from "./publicUtilities"

/**
 * Properties shared amongst all HTML elements
 */
export interface BaseHTMLProps {
	"aria-label"?: string
	className?: string
	"data-testid"?: string
	name?: string
	title?: string
}

export interface BaseLayoutProps extends BaseHTMLProps {
	children?: JSX.Element | JSX.Element[]
}

type BasicLayoutTypes = "column" | "columns" | "container"

/**
 * Internal class for basic layout components. Should cover most situations for a simple layout type
 * @param props
 * @param type
 * @returns
 */
export const BasicLayout = (
	props: BaseLayoutProps,
	type: BasicLayoutTypes
): JSX.Element => {
	const _props = { ...props }
	_props.className = stringPropCombineDefaulter(_props.className, type)
	return <div {..._props}>{_props.children}</div>
}

type _sizes = "small" | "medium" | "large" | "normal"

export interface EditableFunctions {
	onClick?: <T extends HTMLElement>(e: React.MouseEvent<T>) => void
	onEnter?: <T extends HTMLElement>(e: React.KeyboardEvent<T>) => void
	onKeyDown?: <T extends HTMLElement>(e: React.KeyboardEvent<T>) => void
	onKeyUp?: <T extends HTMLElement>(e: React.KeyboardEvent<T>) => void
	onTouchEnd?: <T extends HTMLElement>(e: React.TouchEvent<T>) => void
	onTouchStart?: <T extends HTMLElement>(e: React.TouchEvent<T>) => void
}

/**
 * Properties shared amongst editable/interactable elements
 */
export interface EditableProps extends EditableFunctions {
	actor?: Interactable
	disabled?: boolean
	readonly?: boolean
	rounded?: boolean
	isSize?: _sizes
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
	children: JSX.Element | JSX.Element[]
	horizontal?: boolean
	loading?: boolean
	name: string
	size?: _sizes
}): JSX.Element => {
	const _label = <label className="label">{name}</label>
	return (
		<div className={`field ${ifElseBlank(horizontal, "is-horizontal")}`}>
			{horizontal ? (
				<div className="field-label is-normal">{_label}</div>
			) : (
				_label
			)}
			<div className="field-body">
				<div
					className={`control ${ifElseBlank(
						loading,
						"is-loading"
					)} ${ifElseBlank(exists(size), `is-${size}`)}`}
				>
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
export const propDefaulter = function <T>(
	prop: T | undefined,
	defaultValue: T
): T {
	return exists(prop) ? prop : defaultValue
}

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
	exists(stringProp) && stringProp !== ""
		? `${defaultValue} ${stringProp}`
		: defaultValue
