import { BaseLayoutProps, BasicLayout } from '../BaseElements'

export interface ColProps extends BaseLayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export const Column = (props: ColProps): JSX.Element =>
	BasicLayout(props, 'column')

export const ColumnContainer = (props: BaseLayoutProps): JSX.Element =>
	BasicLayout(props, 'columns')
