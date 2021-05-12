import { axe, toHaveNoViolations } from "jest-axe"
import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import { render, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import { Select, FormSelect } from "../src/select"
import { makeId } from "../src/_base_elements"

expect.extend(toHaveNoViolations)
afterEach(cleanup)

describe("Testing a generic Select", () => {
	it("will render an input element with default properties", () => {
		const test_id = "first-test"
		const { getByTestId } = render(<Select data-testid={test_id} />)
		const testInstance = getByTestId(test_id)
		expect(testInstance).toHaveAttribute("name", "Generic Select")
		expect(testInstance).toHaveAttribute(
			"aria-label",
			testInstance.getAttribute("name")
		)
		expect(testInstance).toHaveAttribute(
			"title",
			testInstance.getAttribute("aria-label")
		)
	})
	it("will render a select with explicit aria-label, id, and testId", () => {
		const html_id: string = makeId()
		const test_id: string = makeId()
		const title = "Test Title"
		const { getByTestId } = render(
			<Select
				aria-label="Hello World"
				id={html_id}
				data-testid={test_id}
				title={title}
			/>
		)
		const testInstance = getByTestId(test_id)
		expect(testInstance).toHaveAttribute("aria-label")
		expect(testInstance.getAttribute("name")).not.toEqual(
			testInstance.getAttribute("aria-label")
		)
		expect(testInstance).toHaveAttribute("id", html_id)
		expect(testInstance).toHaveAttribute("title", title)
	})
	it("will automatically remove testid in a production environment", () => {
		process.env.NODE_ENV = "production"
		const test_id: string = makeId()
		const { findByTestId } = render(<Select data-testid={test_id} />)
		expect(findByTestId(test_id)).rejects
		process.env.NODE_ENV = "test"
	})
	it("is accessable by default", async () => {
		const html: string = ReactDOMServer.renderToString(
			<div role="main">
				<Select />
			</div>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
	it("throws an error if passed a value that doesn't exist in options", (done) => {
		try {
			render(<FormSelect value="nope" />)
			done(Error("Function didn't throw error"))
		} catch (error) {
			done()
		}
	})
})

describe("Testing a FormSelect", () => {
	it("will be rendered with children", () => {
		const test_id = "text-input"
		const { getByTestId } = render(<FormSelect data-testid={test_id} />)
		expect(getByTestId(test_id).hasChildNodes()).toBeTruthy()
	})
	it("will render input props correctly", () => {
		const input_test_id: string = makeId()
		const { getByTestId } = render(
			<FormSelect
				inputProps={{
					"data-testid": input_test_id,
				}}
			/>
		)
		expect(getByTestId(input_test_id).tagName.toLowerCase()).toEqual(
			"select"
		)
	})
	it("will correctly add props to wrapper", () => {
		const wrapper_test_id: string = makeId()
		const { getByTestId } = render(
			<FormSelect
				data-testid={wrapper_test_id}
				name="Hello World"
				wrapperProps={{
					id: "Hello",
				}}
			/>
		)
		expect(getByTestId(wrapper_test_id).tagName.toLowerCase()).toEqual(
			"div"
		)
		expect(getByTestId(wrapper_test_id)).toHaveAttribute("class")
		expect(getByTestId(wrapper_test_id)).toHaveAttribute("id")
		expect(getByTestId(wrapper_test_id)).toHaveAttribute("name")
	})
	it("will render without an input if set to readOnly", () => {
		const value = "Hello Automata"
		const { getByText } = render(
			<FormSelect readOnly={true} value={value} />
		)
		expect(getByText(value)).toBeInTheDocument()
	})
	it("the editable version is accessable by default", async () => {
		const html: string = ReactDOMServer.renderToString(
			<div role="main">
				<FormSelect
					options={[
						{
							display: "Hello",
							value: "hello value",
						},
					]}
					value="hello value"
				/>
			</div>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
	it("will call the onChange function on when selecting an element", () => {
		const testingOnChange = jest.fn()
		const label: string = makeId()
		const { getByLabelText } = render(
			<FormSelect
				name={label}
				onChange={testingOnChange}
				options={[
					{
						display: "A",
						value: "a",
					},
					{
						display: "B",
						value: "b",
					},
				]}
				value="b"
			/>
		)
		userEvent.selectOptions(getByLabelText(label), "a") // selects by VALUE not display
		expect(testingOnChange).toHaveBeenCalled()
	})
})
