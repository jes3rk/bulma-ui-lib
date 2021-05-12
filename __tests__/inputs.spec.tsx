import { axe, toHaveNoViolations } from "jest-axe"
import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import { fireEvent, render, cleanup, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { CheckBox, ClickableTextInput, Input, TextInput } from "../src/input"
import { makeId } from "../src/_base_elements"
import userEvent from "@testing-library/user-event"

expect.extend(toHaveNoViolations)

describe("Testing a generic Input", () => {
	afterEach(cleanup)
	it("will render an input element with default properties", () => {
		const test_id = "first-test"
		const { getByTestId } = render(<Input data-testid={test_id} />)
		const testInstance = getByTestId(test_id)
		expect(testInstance).toHaveAttribute("name", "Generic Input")
		expect(testInstance).toHaveAttribute("type", "text")
		expect(testInstance).toHaveAttribute(
			"aria-label",
			testInstance.getAttribute("name")
		)
		expect(testInstance).toHaveAttribute(
			"title",
			testInstance.getAttribute("aria-label")
		)
	})
	it("will render an input with explicit aria-label, id, and testId", () => {
		const html_id: string = makeId()
		const test_id: string = makeId()
		const title = "Test Title"
		const { getByTestId } = render(
			<Input
				aria-label="Hello World"
				id={html_id}
				data-testid={test_id}
				title={title}
				value=""
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
	it("will call the onChange function on  text input if not read only", () => {
		const testingOnChange = jest.fn()
		const test_id: string = makeId()
		const { getByTestId } = render(
			<Input
				data-testid={test_id}
				onChange={testingOnChange}
				type="text"
				value=""
			/>
		)
		fireEvent.input(getByTestId(test_id), {
			target: { value: "Hello World" },
		})
		expect(testingOnChange).toHaveBeenCalled()
	})
	it("will automatically remove testid in a production environment", () => {
		process.env.NODE_ENV = "production"
		const test_id: string = makeId()
		const { queryByTestId } = render(<Input data-testid={test_id} />)
		expect(queryByTestId(test_id)).not.toBeInTheDocument()
		process.env.NODE_ENV = "test"
	})
	it("is accessable by default", async () => {
		const html: string = ReactDOMServer.renderToString(
			<div role="main">
				<Input />
			</div>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
})

describe("Testing a Text Input", () => {
	afterEach(cleanup)
	it("will be rendered with children", () => {
		const test_id = "text-input"
		const { getByTestId } = render(<TextInput data-testid={test_id} />)
		expect(getByTestId(test_id).hasChildNodes()).toBeTruthy()
	})
	it("will render input props correctly", () => {
		const input_test_id: string = makeId()
		const { getByTestId } = render(
			<TextInput
				inputProps={{
					"data-testid": input_test_id,
				}}
			/>
		)
		expect(getByTestId(input_test_id).tagName.toLowerCase()).toEqual(
			"input"
		)
	})
	it("will correctly add props to wrapper", () => {
		const wrapper_test_id: string = makeId()
		const { getByTestId } = render(
			<TextInput
				data-testid={wrapper_test_id}
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
	})
	it("will have a value if passed a value", () => {
		const wrapper_test_id: string = makeId()
		const value = "Hello Automata"
		const { getByDisplayValue } = render(
			<TextInput data-testid={wrapper_test_id} value={value} />
		)
		expect(getByDisplayValue(value)).toBeInTheDocument()
	})
	it("will not have a value if passed a value but is a password", () => {
		const wrapper_test_id: string = makeId()
		const value = "Hello Automata"
		const { getByDisplayValue } = render(
			<TextInput
				data-testid={wrapper_test_id}
				type="password"
				value={value}
			/>
		)
		expect(getByDisplayValue(value)).toHaveAttribute("type", "password")
	})
	it("will render without an input if set to readOnly", () => {
		const value = "Hello Automata"
		const { getByText } = render(
			<TextInput readOnly={true} value={value} />
		)
		expect(getByText(value)).toBeInTheDocument()
	})
	it("will run a function if the ENTER key is pressed", () => {
		const testId: string = makeId()
		const enterable = jest.fn()
		const { getByTestId } = render(
			<TextInput
				inputProps={{
					"data-testid": testId,
				}}
				onEnter={enterable}
			/>
		)
		getByTestId(testId).focus()
		fireEvent.keyUp(getByTestId(testId), {
			key: "Enter",
			keyCode: 13,
		})
		expect(enterable).toHaveBeenCalled()
	})
	it("the editable version is accessable by default", async () => {
		const html: string = ReactDOMServer.renderToString(
			<div role="main">
				<TextInput value="hello value" />
			</div>
		)
		const results = await axe(html)
		expect(results).toHaveNoViolations()
	})
})
describe("Testing a Clickable Text Input", () => {
	afterEach(cleanup)
	it("renders cleanly as readonly", () => {
		const val = makeId()
		const { getByText } = render(
			<ClickableTextInput
				allowEditing={false}
				name="Testing Input"
				onFinish={null}
				value={val}
			/>
		)
		expect(getByText(val)).toBeInTheDocument()
	})
	it("won't change if allow editing is false and it is clicked", (done) => {
		const val = makeId()
		const { queryAllByRole, getByText } = render(
			<ClickableTextInput
				allowEditing={false}
				name="Testing Input"
				onFinish={null}
				value={val}
			/>
		)
		userEvent.click(getByText(val))
		waitFor(() => {
			expect(queryAllByRole("textbox").length).toEqual(0)
			done()
		})
	})
	it("will change if allow editing is true and it is clicked", (done) => {
		const val = makeId()
		const { queryAllByRole, getByText } = render(
			<ClickableTextInput
				allowEditing={true}
				name="Testing Input"
				onFinish={null}
				value={val}
			/>
		)
		userEvent.click(getByText(val))
		waitFor(() => {
			expect(queryAllByRole("textbox").length).toEqual(1)
			done()
		})
	})
	it("will change on blur of input and call onFinish", (done) => {
		const val = makeId()
		const finisher = jest.fn()
		const { queryAllByRole, getByText } = render(
			<ClickableTextInput
				allowEditing={true}
				name="Testing Input"
				onFinish={finisher}
				value={val}
			/>
		)
		userEvent.click(getByText(val))
		waitFor(() => {
			expect(queryAllByRole("textbox").length).toEqual(1)
			fireEvent.blur(queryAllByRole("textbox")[0])
		}).then(() => {
			waitFor(() => {
				expect(queryAllByRole("textbox").length).toEqual(0)
				expect(finisher).toHaveBeenCalled()
				done()
			})
		})
	})
	it("will call the onFinisher when typing 'Enter' in the text box", (done) => {
		const val = makeId()
		const finisher = jest.fn()
		const { queryAllByRole, getByText, getByLabelText } = render(
			<ClickableTextInput
				allowEditing={true}
				name="Testing Input"
				onFinish={finisher}
				value={val}
			/>
		)
		userEvent.click(getByText(val))
		waitFor(() => {
			expect(queryAllByRole("textbox").length).toEqual(1)
			userEvent.type(getByLabelText("Testing Input"), "{enter}")
		}).then(() => {
			waitFor(() => {
				expect(queryAllByRole("textbox").length).toEqual(0)
				expect(finisher).toHaveBeenCalled()
				done()
			})
		})
	})
	it("will still be a text box when changing focus", (done) => {
		const val = makeId()
		const finisher = jest.fn()
		const { queryAllByRole, getByText, getByTestId } = render(
			<main>
				<ClickableTextInput
					allowEditing={true}
					name="Testing Input"
					onFinish={finisher}
					value={val}
				/>
			</main>
		)
		userEvent.click(getByText(val))
		waitFor(() => {
			expect(queryAllByRole("textbox").length).toEqual(1)
			fireEvent(
				getByTestId("clickable-wrapper"),
				new FocusEvent("blur", {
					relatedTarget: queryAllByRole("textbox")[0],
				})
			)
		}).then(() => {
			waitFor(() => {
				expect(queryAllByRole("textbox").length).toEqual(1)
				expect(finisher).not.toHaveBeenCalled()
				done()
			})
		})
	})
	describe("Testing a Checbox Input", () => {
		afterEach(cleanup)
		it("will be rendered with children", () => {
			const test_id = "text-input"
			const { getByTestId } = render(<CheckBox data-testid={test_id} />)
			expect(getByTestId(test_id).hasChildNodes()).toBeTruthy()
		})
		it("will render input props correctly", () => {
			const input_test_id: string = makeId()
			const { getByTestId } = render(
				<CheckBox
					inputProps={{
						"data-testid": input_test_id,
					}}
				/>
			)
			expect(getByTestId(input_test_id).tagName.toLowerCase()).toEqual(
				"input"
			)
		})
		it("will correctly add props to wrapper", () => {
			const wrapper_test_id: string = makeId()
			const { getByTestId } = render(
				<CheckBox
					data-testid={wrapper_test_id}
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
		})
		it("will have a value if passed a value", () => {
			const wrapper_test_id: string = makeId()
			const value = true
			const { getByRole } = render(
				<CheckBox data-testid={wrapper_test_id} value={value} />
			)
			expect(getByRole("checkbox")).toHaveAttribute("checked")
		})
		it("will render without an input if set to readOnly", () => {
			const value = false
			const { getByRole } = render(
				<CheckBox name="testing" readOnly={true} value={value} />
			)
			expect(getByRole("checkbox")).toHaveAttribute("disabled")
		})
		it.skip("will run a function if the ENTER key is pressed", () => {
			const testId: string = makeId()
			const enterable = jest.fn()
			const { getByTestId } = render(
				<TextInput
					inputProps={{
						"data-testid": testId,
					}}
					onEnter={enterable}
				/>
			)
			getByTestId(testId).focus()
			fireEvent.keyUp(getByTestId(testId), {
				key: "Enter",
				keyCode: 13,
			})
			expect(enterable).toHaveBeenCalled()
		})
		it.skip("the editable version is accessable by default", async () => {
			const html: string = ReactDOMServer.renderToString(
				<div role="main">
					<TextInput value="hello value" />
				</div>
			)
			const results = await axe(html)
			expect(results).toHaveNoViolations()
		})
	})
	it("will call the read only function when set", () => {
		const readOnlyFunction = jest.fn()
		const value = false
		render(
			<CheckBox
				name="testing"
				readOnly={true}
				readOnlyDisplayFunction={readOnlyFunction}
				value={value}
			/>
		)
		expect(readOnlyFunction).toHaveBeenCalled()
	})
})
