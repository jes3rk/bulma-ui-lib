import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import { fireEvent, render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { axe, toHaveNoViolations } from "jest-axe"
import { makeId } from "../src/_base_elements"
import { Button, PrimaryButton, SecondaryButton } from "../src/button"

expect.extend(toHaveNoViolations)
afterEach(cleanup)

describe("Testing the Base Button component", () => {
	it("can be rendered in the UI", () => {
		const testId = makeId()
		const { getByTestId } = render(<Button data-testid={testId} />)
		expect(getByTestId(testId)).toBeInTheDocument()
	})
	it("will be rendered with a text content", () => {
		const textContent = "Hello World"
		const { getByText } = render(<Button>{textContent}</Button>)
		expect(getByText(textContent)).toBeInTheDocument()
	})
	it("will perform actions on click", () => {
		const testId: string = makeId()
		const clickable = jest.fn()
		const { getByTestId } = render(
			<Button data-testid={testId} onClick={clickable}>
				Hello
			</Button>
		)
		fireEvent.click(getByTestId(testId))
		expect(clickable).toHaveBeenCalled()
	})
	it("will perform actions on touch end", () => {
		const testId: string = makeId()
		const clickable = jest.fn()
		const { getByTestId } = render(
			<Button data-testid={testId} onClick={clickable}>
				Hello
			</Button>
		)
		fireEvent.touchEnd(getByTestId(testId))
		expect(clickable).toHaveBeenCalled()
	})
	it("will perform actions on ENTER if focused", () => {
		const testId = makeId()
		const enterable = jest.fn()
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
		const testId: string = makeId()
		const clickable = jest.fn()
		const touchable = jest.fn()
		const enterable = jest.fn()
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
		const testId: string = makeId()
		const { getByTestId } = render(<Button data-testid={testId} />)
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
	it("is a primary button and has the keyword 'primary' in the className", () => {
		const testId: string = makeId()
		const { getByTestId } = render(<PrimaryButton data-testid={testId} />)
		expect(getByTestId(testId)).toHaveClass("is-primary")
	})
	it("is a secondary button and has the keyword 'secondary' in the className", () => {
		const testId: string = makeId()
		const { getByTestId } = render(<SecondaryButton data-testid={testId} />)
		expect(getByTestId(testId)).toHaveClass("secondary")
	})
})
