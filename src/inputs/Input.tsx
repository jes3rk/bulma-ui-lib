import * as React from "react"
import {
	BaseHTMLProps,
	ControlField,
	EditableProps,
	propDefaulter,
	stringPropCombineDefaulter,
} from "../BaseElements"
import Interactable from "../Interactions"
import { exists, ifElseBlank } from "../publicUtilities"

export interface InputProps extends BaseHTMLProps, EditableProps {
	placeholder?: string
	type?: "number" | "password" | "text"
	value?: number | string
}

/**
 * Generic Input type
 * @param props
 * @returns JSX input element
 */
export const Input = (props: InputProps): JSX.Element => {
	const _props = {
		...props,
		...(exists(props.actor)
			? props.actor.multiListener(...Interactable.ALL_LISTENERS)
			: {}),
	}
	_props.className = stringPropCombineDefaulter(
		_props.className,
		ifElseBlank(props.rounded, "is-rounded")
	)
	_props.className = stringPropCombineDefaulter(
		_props.className,
		`${ifElseBlank(exists(_props.isSize), `is-${_props.isSize}`)}`
	)
	_props.className = stringPropCombineDefaulter(_props.className, "input")
	_props["aria-label"] = propDefaulter(_props["aria-label"], props.name)
	delete _props.rounded
	delete _props.isSize
	return <input {..._props} />
}

export interface TextInputProps extends InputProps {
	horizontal?: boolean
	loading?: boolean
	type?: "text" | "password"
}

/**
 * Resuable Text/Password input field
 * @param props
 */
export const TextInput = (props: TextInputProps): JSX.Element => {
	const _props = { ...props }
	_props.type = propDefaulter(_props.type, "text")
	return (
		<ControlField
			horizontal={_props.horizontal}
			loading={props.loading}
			name={_props.name}
			size={_props.isSize}
		>
			<Input {..._props} />
		</ControlField>
	)
}
