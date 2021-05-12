import * as React from "react"
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react"
import { AutoComplete } from "../src/automcomplete"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"

describe("Testing the autocomplete element", () => {
	afterEach(() => {
		cleanup()
	})
	it("doesn't render options without focus", () => {
		const { queryByText, getByTestId } = render(
			<AutoComplete
				data-testid="testid"
				options={["hello", "world"]}
				value=""
			/>
		)
		expect(getByTestId("testid")).toBeInTheDocument()
		expect(queryByText("hello")).not.toBeInTheDocument()
		expect(queryByText("world")).not.toBeInTheDocument()
	})
	it("doesn't render the label if inline", () => {
		const { getByText, getByTestId } = render(
			<AutoComplete
				data-testid="testid"
				name="Name"
				options={["hello", "world"]}
				inline={true}
				value=""
			/>
		)
		expect(getByTestId("testid")).toBeInTheDocument()
		expect(getByText("Name").parentElement).toHaveAttribute(
			"class",
			expect.stringContaining("is-sr-only")
		)
	})
	it("renders an autocomplete of strings on focus", (done) => {
		const { getByText, getByLabelText, getByTestId } = render(
			<AutoComplete
				data-testid="testid"
				name="Name"
				options={["hello", "world"]}
				value=""
			/>
		)
		getByLabelText("Name").focus()
		waitFor(() => {
			expect(getByText("hello")).toBeInTheDocument()
			expect(getByText("world")).toBeInTheDocument()
			expect(getByTestId("testid")).toBeInTheDocument()
			done()
		})
	})
	it("renders a sorted autocomplete of strings on focus", (done) => {
		const { getByText, getByLabelText } = render(
			<AutoComplete
				data-testid="testid"
				name="Name"
				options={["hello", "world", "abracadabra"]}
				value=""
			/>
		)
		getByLabelText("Name").focus()
		waitFor(() => {
			expect(getByText("hello")).toBeInTheDocument()
			expect(getByText("world")).toBeInTheDocument()
			expect(getByText("abracadabra")).toBeInTheDocument()
			done()
		})
	})
	it("renders an autocomplete of objects on focus", (done) => {
		const { getByText, getByLabelText } = render(
			<AutoComplete
				name="Name"
				options={[
					{
						display: "hello",
						value: "123",
					},
					"world",
				]}
				value={{
					display: "hello",
					value: "123",
				}}
			/>
		)
		getByLabelText("Name").focus()
		userEvent.clear(getByLabelText("Name"))
		waitFor(() => {
			expect(getByText("hello")).toBeInTheDocument()
			expect(getByText("world")).toBeInTheDocument()
			done()
		})
	})
	it("renders acceptably without options", () => {
		const { getByLabelText } = render(<AutoComplete name="Name" value="" />)
		expect(getByLabelText("Name")).toBeInTheDocument()
	})
	it("renders the default read only function", () => {
		const { getByText } = render(
			<AutoComplete name="Name" readOnly={true} value="Hello" />
		)
		expect(getByText("Hello")).toBeInTheDocument()
	})
	it("renders the custom read only function", () => {
		const { getByText } = render(
			<AutoComplete
				name="Name"
				readOnly={true}
				readOnlyDisplayFunction={() => <h1>hello world</h1>}
				value="Hello"
			/>
		)
		expect(getByText("hello world")).toBeInTheDocument()
	})
	it("hides options on blur", (done) => {
		const { queryByText, getByLabelText } = render(
			<div>
				<h1>Hello World</h1>
				<AutoComplete
					name="Name"
					options={[
						{
							display: "hello",
							value: "123",
						},
						"world",
					]}
					value={{
						display: "hello",
						value: "123",
					}}
				/>
			</div>
		)
		getByLabelText("Name").focus()
		userEvent.clear(getByLabelText("Name"))
		waitFor(() => {
			expect(queryByText("hello")).toBeInTheDocument()
			fireEvent.blur(queryByText("Name"))
		}).then(() => {
			expect(queryByText("hello")).not.toBeInTheDocument()
			done()
		})
	})
})
