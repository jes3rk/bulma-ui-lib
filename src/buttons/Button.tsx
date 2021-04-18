import * as React from "react"
import { ReactNode } from "react"
import {
	BaseHTMLProps,
	EditableProps,
	stringPropCombineDefaulter,
} from "../BaseElements"
import Interactable from "../Interactions"
import { exists } from "../publicUtilities"

export interface ButtonProps extends BaseHTMLProps, EditableProps {
	children: ReactNode
}

export const Button = (props: ButtonProps): JSX.Element => {
	const _props: ButtonProps = {
		...props,
		...(exists(props.actor)
			? props.actor.multiListener(...Interactable.ALL_LISTENERS)
			: Interactable.generateActor(props).multiListener(
					...Interactable.ALL_LISTENERS
			  )),
	}
	if (_props.onEnter) delete _props.onEnter
	_props.className = stringPropCombineDefaulter(props.className, "button")
	return <button {..._props}>{_props.children}</button>
}

export const PrimaryButton = (props: ButtonProps): JSX.Element => {
	const _props: ButtonProps = {
		...props,
		className: stringPropCombineDefaulter(props.className, "is-primary"),
	}
	return <Button {..._props} />
}

export const SecondaryButton = (props: ButtonProps): JSX.Element => {
	const _props: ButtonProps = {
		...props,
		className: stringPropCombineDefaulter(props.className, "is-secondary"),
	}
	return <Button {..._props} />
}
