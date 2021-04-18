import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import { fireEvent, render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { axe, toHaveNoViolations } from "jest-axe"
import {
	Button,
	PrimaryButton,
	SecondaryButton,
} from "../../src/buttons/Button"

expect.extend(toHaveNoViolations)

describe("Testing the Base Button component", () => {
	const testId = "helloworld"
	afterEach(cleanup)
	it("can be rendered in the UI", () => {
		const { getByTestId } = render(
			<Button data-testid={testId}>Hello</Button>
		)
		expect(getByTestId(testId)).toBeInTheDocument()
	})
	it("will be rendered with a text content", () => {
		const textContent = "Hello World"
		const { getByText } = render(<Button>{textContent}</Button>)
		expect(getByText(textContent)).toBeInTheDocument()
	})
	it("will perform actions on click", () => {
		const clickable = jest.fn(
			(e: React.SyntheticEvent<HTMLElement>): void => null
		)
		const { getByTestId } = render(
			<Button data-testid={testId} onClick={clickable}>
				Hello
			</Button>
		)
		fireEvent.click(getByTestId(testId))
		expect(clickable).toHaveBeenCalled()
	})
	it("will perform actions on touch end", () => {
		const clickable = jest.fn(
			(e: React.SyntheticEvent<HTMLElement>): void => null
		)
		const { getByTestId } = render(
			<Button data-testid={testId} onClick={clickable}>
				Hello
			</Button>
		)
		fireEvent.touchEnd(getByTestId(testId))
		expect(clickable).toHaveBeenCalled()
	})
	it("will perform actions on ENTER if focused", () => {
		const enterable = jest.fn(
			(e: React.SyntheticEvent<HTMLElement>): void => null
		)
		const { getByTestId } = render(
			<Button data-testid={testId} onEnter={enterable}>
				Hello
			</Button>
		)
		getByTestId(testId).focus()
		fireEvent.keyUp(getByTestId(testId), {
			key: "Enter",
			keyCode: 13,
		})
		expect(enterable).toHaveBeenCalled()
	})
	it("will perform different actions on touch end, enter, and click events", () => {
		const clickable = jest.fn(
			(e: React.SyntheticEvent<HTMLElement>): void => null
		)
		const touchable = jest.fn(
			(e: React.SyntheticEvent<HTMLElement>): void => null
		)
		const enterable = jest.fn(
			(e: React.SyntheticEvent<HTMLElement>): void => null
		)
		const { getByTestId } = render(
			<Button
				data-testid={testId}
				onClick={clickable}
				onEnter={enterable}
				onTouchEnd={touchable}
			>
				Hello
			</Button>
		)
		fireEvent.click(getByTestId(testId))
		expect(clickable).toHaveBeenCalled()
		expect(touchable).not.toHaveBeenCalled()
		fireEvent.touchEnd(getByTestId(testId))
		expect(touchable).toHaveBeenCalled()
		getByTestId(testId).focus()
		fireEvent.keyUp(getByTestId(testId), {
			key: "Enter",
			keyCode: 13,
		})
		expect(enterable).toHaveBeenCalled()
		expect(clickable).toHaveBeenCalledTimes(1)
	})
	it("will do nothing if ENTER'd with no functions", () => {
		const { getByTestId } = render(
			<Button data-testid={testId}>Hello</Button>
		)
		getByTestId(testId).focus()
		fireEvent.keyUp(getByTestId(testId), { key: "Enter", keyCode: 13 })
		expect(getByTestId(testId)).toBeInTheDocument()
	})
	it("is accessable by with an onClick function only", async () => {
		const html: string = ReactDOMServer.renderToString(
			<div role="main">
				<Button>Hello</Button>
			</div>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
})
describe("Testing other buttons", () => {
	const testId = "dfkljdsklf;a"
	afterEach(cleanup)
	it("is a primary button and has the keyword 'primary' in the className", () => {
		const { getByTestId } = render(
			<PrimaryButton data-testid={testId}>Hello</PrimaryButton>
		)
		expect(getByTestId(testId)).toHaveClass("is-primary")
	})
	it("is a secondary button and has the keyword 'secondary' in the className", () => {
		const { getByTestId } = render(
			<SecondaryButton data-testid={testId}>Hello</SecondaryButton>
		)
		expect(getByTestId(testId)).toHaveClass("is-secondary")
	})
})
