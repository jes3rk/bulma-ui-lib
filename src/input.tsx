import * as React from "react"
import {
	BaseHTMLProps,
	filterObjectProps,
	makeId,
	sanitizeProps,
} from "./_base_elements"
import { exists } from "./utilities"
import Interactable from "./Interactions"

type InputType = "checkbox" | "number" | "password" | "text"

export interface InputProps extends BaseHTMLProps {
	checked?: boolean
	defaultValue?: string
	disabled?: boolean
	max?: number
	min?: number
	onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	pattern?: string
	placeholder?: string
	type?: InputType
	value?: number | string
}

/**
 * Basic Text input. Normally not used on it's own
 * @param props
 */
export const Input = (props: InputProps): JSX.Element => {
	const _defaults: InputProps = {
		name: "Generic Input",
		"data-testid": makeId(),
		type: "text",
	}
	const _props: InputProps = sanitizeProps(_defaults, props)
	if (!exists(props.title)) _props.title = _props["aria-label"]
	if (exists(_props.value) && typeof _props.value === "string") {
		if (!exists(props.onChange)) {
			_props.defaultValue = _props.value
			delete _props.value
		}
	}
	const actor = Interactable.generateActor<HTMLInputElement>(_props)
	return (
		<input
			{...filterObjectProps(_props, null, ["onEnter"])}
			{...actor.multiListener(...Interactable.ALL_LISTENERS)}
		/>
	)
}

interface CheckboxProps {
	"data-testid"?: string
	inputProps?: InputProps
	name?: string
	onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	readOnly?: boolean
	readOnlyDisplayFunction?: (value: boolean) => JSX.Element
	value?: boolean
	wrapperProps?: BaseHTMLProps
}

export const CheckBox = (props: CheckboxProps): JSX.Element => {
	const _defaults: TextInputProps = {
		inputProps: {
			className: "checkbox",
			disabled: props.readOnly,
			type: "checkbox",
		},
		wrapperProps: {
			className: "field is-horizontal",
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
	if (exists(props.value)) _inputProps.checked = props.value
	if (exists(props.name)) {
		_wrapperProps.name = props.name
		_inputProps.name = props.name
	}
	if (exists(props.onChange)) _inputProps.onChange = props.onChange
	return exists(props.readOnlyDisplayFunction) && props.readOnly ? (
		<div>{props.readOnlyDisplayFunction(props.value)}</div>
	) : (
		<div {..._wrapperProps}>
			<div className="field-label is-normal">
				<label htmlFor={_inputProps.id} className="checkbox">
					<Input {..._inputProps} />
					{_inputProps.name}
				</label>
			</div>
		</div>
	)
}

interface TextInputProps {
	"data-testid"?: string
	inline?: boolean
	inputProps?: InputProps
	name?: string
	onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	readOnly?: boolean
	readOnlyDisplayFunction?: (value: number | string) => JSX.Element
	type?: "number" | "password" | "text"
	value?: number | string
	wrapperProps?: BaseHTMLProps
}

/**
 * Basic Text input that with auto-set and format for easier use
 * @param props
 */
export const TextInput = (props: TextInputProps): JSX.Element => {
	const _defaults: TextInputProps = {
		inputProps: {
			className: "input is-rounded",
		},
		wrapperProps: {
			className: "field is-horizontal",
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
	if (exists(props.value)) _inputProps.value = props.value
	if (exists(props.name)) {
		_wrapperProps.name = props.name
		_inputProps.name = props.name
	}
	if (exists(props.type)) _inputProps.type = props.type
	if (exists(props.onChange)) _inputProps.onChange = props.onChange
	if (exists(props.onEnter)) _inputProps.onEnter = props.onEnter
	if (exists(props.inline) && props.inline)
		_inputProps.placeholder = _inputProps.name
	return exists(props.readOnlyDisplayFunction) && props.readOnly ? (
		<div>{props.readOnlyDisplayFunction(props.value)}</div>
	) : (
		<div {..._wrapperProps}>
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
						<Input {..._inputProps} />
					)}
				</div>
			</div>
		</div>
	)
}

interface ClickableTextInputProps {
	value: string
	onFinish: (e: React.FocusEvent<HTMLInputElement>) => void
	allowEditing: boolean
	name: string
	Wrapper?: "div" | "p" | "td" | "th"
}

export const ClickableTextInput = ({
	allowEditing,
	name,
	onFinish,
	value,
	Wrapper = "div",
}: ClickableTextInputProps): JSX.Element => {
	const [isEditable, setIsEditable] = React.useState<boolean>(false)
	const clearEditing = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsEditable(false)
		onFinish(e)
	}
	const actor = new Interactable()
	actor.registerClickFunction(() => {
		if (allowEditing) setIsEditable(true)
	})
	actor.registerEnterKey(() => {
		if (allowEditing) setIsEditable(!isEditable)
	})
	const props = {
		children: (
			<TextInput
				name={name}
				inline={true}
				inputProps={{
					onBlur: clearEditing,
					onEnter: (e) => e.currentTarget.blur(),
				}}
				readOnly={!isEditable}
				readOnlyDisplayFunction={(val: string) => <span>{val}</span>}
				value={value}
			/>
		),
		onBlur: (e: React.FocusEvent<HTMLElement>) => {
			if (!e.currentTarget.contains(e.relatedTarget as Node))
				setIsEditable(false)
		},
		tabIndex: 0,
	}
	return (
		<Wrapper
			className="clickable-text-input-wrapper"
			{...props}
			{...actor.multiListener(...Interactable.ALL_LISTENERS)}
			data-testid="clickable-wrapper"
		/>
	)
}

interface PoppableTextInputProps {
	enable?: boolean
	name: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	popperFactory: (ch: () => void) => JSX.Element
	value: string
}

export const PoppableTextInput = (
	props: PoppableTextInputProps
): JSX.Element => {
	const [showInput, setShowInput] = React.useState<boolean>(false)
	return (
		<div
			className="is-display-flex is-relative"
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node))
					setShowInput(false)
			}}
		>
			{showInput && (
				<TextInput
					inline={true}
					name={`${props.name} Input`}
					onChange={props.onChange}
					value={props.value}
					wrapperProps={{
						className: "poppable",
					}}
				/>
			)}
			{props.popperFactory(() => {
				if (props.enable) setShowInput(!showInput)
			})}
		</div>
	)
}
