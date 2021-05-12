import * as React from "react"
import {
	BaseHTMLProps,
	filterObjectProps,
	sanitizeProps,
} from "./_base_elements"
import Interactable from "./Interactions"

export interface ButtonProps extends BaseHTMLProps {
	onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void
	onClick?: (e: React.MouseEvent<HTMLElement>) => void
	onTouchEnd?: (e: React.TouchEvent<HTMLElement>) => void
}

export const Button = (props: ButtonProps): JSX.Element => {
	const _default: ButtonProps = {
		className: "button",
	}
	const _props: ButtonProps = sanitizeProps(_default, props)
	const actor = Interactable.generateActor(_props)
	return (
		<button
			{...filterObjectProps(_props, null, ["onEnter"])}
			{...actor.multiListener(...Interactable.ALL_LISTENERS)}
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
