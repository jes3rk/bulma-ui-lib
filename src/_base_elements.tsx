import * as React from "react"
import { exists } from "./utilities"

export interface BaseHTMLProps extends Record<string, unknown> {
	"aria-label"?: string
	children?: JSX.Element | JSX.Element[] | string
	className?: string
	"data-testid"?: string
	id?: string
	onBlur?: (e: React.FocusEvent<HTMLElement>) => void
	onClick?: (e: React.MouseEvent<HTMLElement>) => void
	onEnter?: (e: React.SyntheticEvent<HTMLElement>) => void
	onFocus?: (e: React.FocusEvent<HTMLElement>) => void
	name?: string
	title?: string
}

/**
 * Function to generate a random test id for use in testing DOM elements
 * @param preset String to be used to manually define the testId
 */
export const makeId = (preset: string = null): string => {
	return exists(preset) ? preset : Math.random().toString(36).substring(7)
}

/**
 * Return a filtered version of the passed object with only the properties provided in the array
 * @param allowedProps Array of allowed keys as strings
 * @param filterableObject Object to filter on. All keys must be strings
 * @param deniedProps Array of keys to remove
 */
export const filterObjectProps = (
	filterableObject: Record<string, unknown>,
	allowedProps: string[] = null,
	deniedProps: string[] = null
): Record<string, unknown> => {
	let returnable: Record<string, unknown> = {}
	if (exists(allowedProps)) {
		allowedProps.forEach((k) => {
			if (exists(filterableObject[k])) returnable[k] = filterableObject[k]
		})
	} else {
		returnable = { ...filterableObject }
	}
	if (exists(deniedProps))
		deniedProps.forEach((k) => {
			if (exists(returnable[k])) delete returnable[k]
		})
	return returnable
}

export const sanitizeProps = (
	defaultProps: BaseHTMLProps,
	passedProps: BaseHTMLProps = {}
): BaseHTMLProps => {
	const returnObj: BaseHTMLProps = Object.assign(
		{},
		defaultProps,
		passedProps
	)
	if (!exists(returnObj["aria-label"]))
		returnObj["aria-label"] = returnObj.name
	if (!exists(returnObj.title)) returnObj.title = returnObj.name
	if (!exists(returnObj.id)) returnObj.id = makeId()
	if (process.env.NODE_ENV === "production" && returnObj["data-testid"])
		delete returnObj["data-testid"]
	if (exists(defaultProps.className) && exists(passedProps.className))
		returnObj.className = `${defaultProps.className} ${passedProps.className}`
	return returnObj
}

export const onKeyPress = (
	e: React.KeyboardEvent<HTMLElement>,
	handler: {
		[keyCode: number]: (e: React.KeyboardEvent<HTMLElement>) => void
	}
): void => {
	if (exists(handler[e.keyCode])) {
		e.preventDefault()
		handler[e.keyCode](e)
	}
}
