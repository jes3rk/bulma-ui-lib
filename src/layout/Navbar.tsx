import React from "react"
import { BaseLayoutProps, stringPropCombineDefaulter } from "../BaseElements"

export interface NavBarProps extends BaseLayoutProps {
	className?: string
}

export const NavBar = ({ children, className }: NavBarProps) => {
	return (
		<nav
			role="navigation"
			aria-label="main-navigation"
			className={stringPropCombineDefaulter(className, "navbar")}
		>
			{children}
		</nav>
	)
}
