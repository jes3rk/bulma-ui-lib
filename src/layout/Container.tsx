import { BaseLayoutProps, BasicLayout } from '../BaseElements'

/**
 * Root object for most bulma uses
 */
export const Container = (props: BaseLayoutProps): JSX.Element =>
	BasicLayout(props, 'container')
