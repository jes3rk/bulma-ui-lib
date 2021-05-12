import { axe, toHaveNoViolations } from "jest-axe"
import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import "@testing-library/jest-dom/extend-expect"
import { makeId } from "../src/_base_elements"
import { render } from "@testing-library/react"
import { _baseNotification, Danger } from "../src/notfication"

expect.extend(toHaveNoViolations)

describe("Testing the base notification", () => {
	it("will have a class of 'is-hidden' if visitbility=false", () => {
		const testId: string = makeId()
		const { getByTestId } = render(
			<_baseNotification data-testid={testId} visibility={false}>
				Hello World
			</_baseNotification>
		)
		expect(getByTestId(testId)).toHaveClass("is-hidden")
	})
	it("will not have a class of 'is-hidden' by default", () => {
		const testId: string = makeId()
		const { getByTestId } = render(
			<_baseNotification data-testid={testId}>
				Hello World
			</_baseNotification>
		)
		expect(getByTestId(testId)).not.toHaveClass("is-hidden")
	})
	it("is accessible", async () => {
		const html: string = ReactDOMServer.renderToString(
			<main>
				<_baseNotification>Hello World</_baseNotification>
			</main>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
})
describe("Testing the Danger notification", () => {
	it("has a class of 'is-danger'", () => {
		const testId: string = makeId()
		const { getByTestId } = render(
			<Danger data-testid={testId}>Hello World</Danger>
		)
		expect(getByTestId(testId)).toHaveClass("is-danger")
	})
	it("has custom classes if passed", () => {
		const testId: string = makeId()
		const _name = "custom-class"
		const { getByTestId } = render(
			<Danger className={_name} data-testid={testId}>
				Hello World
			</Danger>
		)
		expect(getByTestId(testId)).toHaveClass(_name)
	})
	it("is accessible", async () => {
		const html: string = ReactDOMServer.renderToString(
			<main>
				<Danger>Danger, Will Robinson!</Danger>
			</main>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
})
