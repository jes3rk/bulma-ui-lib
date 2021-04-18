import * as React from "react"
import { stringPropCombineDefaulter } from "../BaseElements"

export interface _HeadingProps extends HeadingProps {
	size: number
}

/**
 * Generic Heading Type
 */
export const _Heading = (props: _HeadingProps): JSX.Element => {
	const _HEADING = `h${props.size}` as keyof JSX.IntrinsicAttributes
	const _props = {
		className: stringPropCombineDefaulter(
			props.className,
			`is-size-${props.size}`
		),
	}
	return React.createElement(_HEADING, _props, props.children)
}

export interface HeadingProps {
	children: JSX.Element | JSX.Element[] | string
	className?: string
	"data-testid"?: string
}

export const H1 = (props: HeadingProps): JSX.Element => (
	<_Heading {...props} size={1} />
)
export const H2 = (props: HeadingProps): JSX.Element => (
	<_Heading {...props} size={2} />
)
export const H3 = (props: HeadingProps): JSX.Element => (
	<_Heading {...props} size={3} />
)
export const H4 = (props: HeadingProps): JSX.Element => (
	<_Heading {...props} size={4} />
)
export const H5 = (props: HeadingProps): JSX.Element => (
	<_Heading {...props} size={5} />
)
export const H6 = (props: HeadingProps): JSX.Element => (
	<_Heading {...props} size={6} />
)
