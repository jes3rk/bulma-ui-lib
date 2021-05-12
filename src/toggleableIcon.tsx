import * as React from "react"
import { exists } from "./utilities"

interface ToggleableIconProps {
	className?: string
	name?: string
	onClick: (index: number) => void
	options: string[]
}
/**
 * Functional component to toggle between N icons and run a callback for each option based on it's index. Switch triggers onClick.
 * @param {string} className Additional class names to apply to the span wrapper element.
 * @param {string} name Name for the element. Will also propogate to other accessability properties.
 * @param {(idx: number) => void} onClick Function to run on clicking of the icon. Will pass the index of the NEXT element or zero if wrapping back around
 * @param {string[]} options Array of icon classnames to be used for the various options. Default to zero.
 */
export const ToggleableIcon = (props: ToggleableIconProps): JSX.Element => {
	const [optionIndex, setOptionIndex] = React.useState<number>(0)
	if (props.options.length < 1)
		throw Error("Options must have a length of at least one")
	const accessAbility: { [key: string]: string | number } = {
		tabIndex: 0,
	}
	if (exists(props.name)) {
		accessAbility["title"] = props.name
		accessAbility["aria-label"] = props.name
	}
	const icons = props.options.map((o, i) => <i className={o} key={i}></i>)
	return (
		<span
			key={`toggle-icons-${name}-option-${optionIndex}`}
			className={`action-icon ${
				exists(props.className) && props.className
			}`}
			{...accessAbility}
			role="button"
			onClick={() => {
				const nextIdx =
					optionIndex === props.options.length - 1
						? 0
						: optionIndex + 1
				setOptionIndex(nextIdx)
				props.onClick(nextIdx)
			}}
		>
			{icons[optionIndex]}
		</span>
	)
}
