import * as React from "react"
import {
	BaseHTMLProps,
	filterObjectProps,
	onKeyPress,
	sanitizeProps,
} from "./_base_elements"
import { exists } from "./utilities"

export interface ButtonProps extends BaseHTMLProps {
	onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	onTouchEnd?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = (props: ButtonProps): JSX.Element => {
	const _default: ButtonProps = {
		className: "button",
	}
	const _props: ButtonProps = sanitizeProps(_default, props)
	if (exists(_props.onClick)) {
		if (!exists(_props.onTouchEnd)) _props.onTouchEnd = _props.onClick
		if (!exists(_props.onEnter)) _props.onEnter = _props.onClick
	}
	return (
		<button
			{...filterObjectProps(_props, null, ["onEnter"])}
			onKeyUp={(e) =>
				onKeyPress(e, {
					13: props.onEnter,
				})
			}
		>
			{_props.children}
		</button>
	)
}

export const PrimaryButton = (props: ButtonProps): JSX.Element => {
	const _default: ButtonProps = {
		className: "is-primary",
	}
	const _props: ButtonProps = sanitizeProps(_default, props)
	return <Button {..._props} />
}

export const SecondaryButton = (props: ButtonProps): JSX.Element => {
	const _default: ButtonProps = {
		className: "secondary",
	}
	const _props: ButtonProps = sanitizeProps(_default, props)
	return <Button {..._props} />
}
