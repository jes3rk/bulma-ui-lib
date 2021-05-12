import * as React from "react"
import { exists, guid } from "./utilities"
import { Input, InputProps } from "./input"
import { BaseHTMLProps, sanitizeProps } from "./_base_elements"

export interface AutocompleteOption {
	display: string
	value: string | number
}

export interface AutomcompleteProps extends BaseHTMLProps {
	inline?: boolean
	inputProps?: InputProps
	onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onChange?: (v: string | number) => void
	options?: (string | AutocompleteOption)[]
	readOnly?: boolean
	readOnlyDisplayFunction?: (v: AutocompleteOption) => JSX.Element
	type?: string
	value?: string | AutocompleteOption
	wrapperProps?: BaseHTMLProps
}

export const AutoComplete = (props: AutomcompleteProps): JSX.Element => {
	const _defaults: AutomcompleteProps = {
		inputProps: {
			className: "input is-rounded",
			type: "text",
		},
		wrapperProps: {
			className: "field is-horizontal autocomplete",
		},
	}
	const _inputProps: InputProps = sanitizeProps(
		_defaults.inputProps,
		props.inputProps
	)
	const _wrapperProps: BaseHTMLProps = sanitizeProps(
		_defaults.wrapperProps,
		props.wrapperProps
	)
	if (exists(props["data-testid"]))
		_wrapperProps["data-testid"] = props["data-testid"]
	if (exists(props.name)) {
		_wrapperProps.name = props.name
		_inputProps.name = props.name
	}
	const options: AutocompleteOption[] = exists(props.options)
		? props.options
				.map((o) =>
					typeof o === "string"
						? {
								display: o,
								value: o,
						  }
						: o
				)
				.sort((a, b) =>
					a.display.toLowerCase() > b.display.toLowerCase() ? 1 : -1
				)
		: []
	const _value: AutocompleteOption =
		typeof props.value === "string"
			? {
					display: props.value,
					value: props.value,
			  }
			: props.value
	const [showOptions, setShowOptions] = React.useState<boolean>(false)
	const [filter, setFilter] = React.useState<string>(_value.display)
	// TODO: make keyboard navigable
	return exists(props.readOnlyDisplayFunction) && props.readOnly ? (
		<div>{props.readOnlyDisplayFunction(_value)}</div>
	) : (
		<div {..._wrapperProps} onBlur={() => setShowOptions(false)}>
			<div
				className={`field-label is-normal ${
					props.inline && "is-sr-only"
				}`}
			>
				<label htmlFor={_inputProps.id}>{_inputProps.name}</label>
			</div>
			<div className="field-body">
				<div className="control">
					{props.readOnly ? (
						<span {..._inputProps}>{props.value}</span>
					) : (
						<Input
							{..._inputProps}
							onFocus={() => setShowOptions(true)}
							onChange={(e) => {
								setShowOptions(true)
								setFilter(e.target.value)
							}}
							value={filter}
						/>
					)}
					<ul>
						{showOptions &&
							options
								.filter((o) =>
									o.display
										.toLowerCase()
										.match(filter.toLowerCase())
								)
								.map((o) => (
									<li
										{...o}
										key={guid()}
										onMouseDown={(e) => {
											e.preventDefault()
											props.onChange(o.value)
											setShowOptions(false)
										}}
									>
										{o.display}
									</li>
								))}
					</ul>
				</div>
			</div>
		</div>
	)
}
