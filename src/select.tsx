import * as React from "react"
import { exists, guid } from "./utilities"
import {
	BaseHTMLProps,
	filterObjectProps,
	makeId,
	sanitizeProps,
} from "./_base_elements"

export interface SelectOption {
	disabled?: boolean
	display: string
	value: number | string
}

interface SelectProps extends BaseHTMLProps {
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
	options?: SelectOption[]
	value?: number | string
}

export const Select = (props: SelectProps): JSX.Element => {
	const _defaults: SelectProps = {
		"data-testid": makeId(),
		name: "Generic Select",
		options: [],
	}
	const _props: SelectProps = sanitizeProps(_defaults, props)
	if (exists(props.value)) {
		if (
			!exists(props.options) ||
			!props.options.map((o) => o.value).includes(props.value)
		)
			throw Error("Value not in list of options")
	}
	if (!exists(props.title)) _props.title = _props["aria-label"]
	return (
		<div className="select is-rounded">
			<select
				{...filterObjectProps(_props, null, ["options", "onEnter"])}
			>
				{_props.options.map((o) => (
					<option key={guid()} value={o.value} disabled={o.disabled}>
						{o.display}
					</option>
				))}
			</select>
		</div>
	)
}

interface FormSelectProps {
	"data-testid"?: string
	inline?: boolean
	inputProps?: SelectProps
	name?: string
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
	options?: SelectOption[]
	pills?: JSX.Element[]
	readOnly?: boolean
	readOnlyDisplayFunction?: (value: string | number) => JSX.Element
	value?: string | number
	wrapperProps?: BaseHTMLProps
}

/**
 * Select Element with included label information
 * @param {boolean} inline Optional: Set to true to make the label information hidden in the UI but visible to screen readers
 * @param {SelectProps} inputProps Optional: Props to pass directly to the input
 * @param {string} name Optional: Name of the element that will auto-propogate to aria-label and title properties
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} onChange Function to be called when the option is changed
 * @param {SelectOption[]} options All options to be available to be selected
 * @param {boolean} readOnly Optional: Used to toggle editablility of the UI element
 * @param {(value: string|number) => JSX.Element} readOnlyDisplayFunction Optional override of the default read only behaviour
 * @param {string|number} value Value of the select element
 * @param {BaseHTMLProps} wrapperProps Optional: Props to pass directly to the wrapper elements
 */
export const FormSelect = (props: FormSelectProps): JSX.Element => {
	const _defaults: FormSelectProps = {
		inputProps: {
			className: "input is-rounded",
		},
		wrapperProps: {
			className: "field is-horizontal",
		},
	}
	const _inputProps: SelectProps = exists(props.inputProps)
		? sanitizeProps(_defaults.inputProps, props.inputProps)
		: sanitizeProps(_defaults.inputProps, {})
	const _wrapperProps: BaseHTMLProps = exists(props.wrapperProps)
		? sanitizeProps(_defaults.wrapperProps, props.wrapperProps)
		: sanitizeProps(_defaults.wrapperProps, {})
	if (exists(props["data-testid"]))
		_wrapperProps["data-testid"] = props["data-testid"]
	if (exists(props.value)) _inputProps.value = props.value
	if (exists(props.name)) {
		_wrapperProps.name = props.name
		_inputProps.name = props.name
	}
	if (exists(props.onChange)) _inputProps.onChange = props.onChange
	if (exists(props.options))
		_inputProps.options = [
			{
				disabled: true,
				display: "Select One",
				value: "",
			},
			...props.options,
		]
	let _displayValue = null
	if (exists(_inputProps.options) && _inputProps.options.length > 0) {
		try {
			_displayValue = _inputProps.options.find(
				(e) => e.value === props.value
			).display
		} catch (error) {
			_displayValue = props.value
		}
	} else {
		_displayValue = props.value
	}
	return exists(props.readOnlyDisplayFunction) && props.readOnly ? (
		<div>{props.readOnlyDisplayFunction(_displayValue)}</div>
	) : (
		<div {..._wrapperProps}>
			<div
				className={`field-label is-normal ${
					props.inline && "is-sr-only"
				}`}
			>
				<label htmlFor={_inputProps.id}>{_inputProps.name}</label>
			</div>
			<div
				className={`field-body ${
					exists(props.pills) ? "is-flex-direction-column" : ""
				}`}
			>
				<div className="control">
					{props.readOnly && !exists(props.pills) ? (
						<span
							{...filterObjectProps(_inputProps, null, [
								"options",
								"value",
							])}
						>
							{_displayValue}
						</span>
					) : (
						<Select {..._inputProps} />
					)}
				</div>
				{exists(props.pills) && (
					<div className="tags my-1">{props.pills}</div>
				)}
			</div>
		</div>
	)
}
