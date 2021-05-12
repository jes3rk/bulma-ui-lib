import * as React from "react"
import { exists } from "./utilities"
import { makeId } from "./_base_elements"

interface NotificationProps {
	children: JSX.Element | JSX.Element[] | string
	className?: string
	"data-testid"?: string
	visibility?: boolean
}

export const _baseNotification = (props: NotificationProps): JSX.Element => {
	let _baseClassName = "notification has-text-weight-bold"
	if (exists(props.visibility) && !props.visibility)
		_baseClassName = `${_baseClassName} is-hidden`
	if (exists(props.className))
		_baseClassName = `${_baseClassName} ${props.className}`
	return (
		<div
			className={_baseClassName}
			data-testid={
				exists(props["data-testid"]) ? props["data-testid"] : makeId()
			}
		>
			{props.children}
		</div>
	)
}

export const Danger = (props: NotificationProps): JSX.Element => {
	const _props = { ...props }
	if (exists(_props.className)) {
		_props.className = `is-danger ${_props.className}`
	} else {
		_props.className = "is-danger"
	}
	return <_baseNotification {..._props} />
}
