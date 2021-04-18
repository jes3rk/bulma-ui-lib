import { cleanup, fireEvent, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as React from "react"
import Interactions from "../src/Interactions"

describe("Testing the Interactions class", () => {
	const testID = "helkfdjslkaj"
	const _mockFire = jest.fn()

	afterEach(() => {
		_mockFire.mockReset()
		cleanup()
	})
	it("will register and fire a click event and throw an error on a duplicate", (done) => {
		const actor = new Interactions()
		actor.registerClickFunction(_mockFire)
		const { getByTestId } = render(
			<input data-testid={testID} onClick={(e) => actor.listen(e)} />
		)
		userEvent.click(getByTestId(testID))
		waitFor(() => {
			expect(_mockFire).toHaveBeenCalled()
			expect(() =>
				actor.registerClickFunction(console.log)
			).toThrowError()
			done()
		})
	})
	it("will register and fire a key up event and throw an error on a duplication", (done) => {
		const actor = new Interactions()
		actor.registerKeyUpFunction("r", _mockFire)
		const { getByTestId } = render(
			<input data-testid={testID} onKeyUp={(e) => actor.listen(e)} />
		)
		userEvent.type(getByTestId(testID), "r")
		waitFor(() => {
			expect(_mockFire).toHaveBeenCalled()
			expect(() =>
				actor.registerKeyUpFunction("r", console.log)
			).toThrowError()
			done()
		})
	})
	it("will register and fire a key down event and throw an error on a duplication", (done) => {
		const actor = new Interactions()
		actor.registerKeyDownFunction("r", _mockFire)
		const { getByTestId } = render(
			<input data-testid={testID} onKeyDown={(e) => actor.listen(e)} />
		)
		userEvent.type(getByTestId(testID), "r")
		waitFor(() => {
			expect(_mockFire).toHaveBeenCalled()
			expect(() =>
				actor.registerKeyDownFunction("r", console.log)
			).toThrowError()
			done()
		})
	})
	it("will register and fire an enter key event and throw an error on a duplication", (done) => {
		const actor = new Interactions()
		actor.registerEnterKey(_mockFire)
		const { getByTestId } = render(
			<input data-testid={testID} onKeyUp={(e) => actor.listen(e)} />
		)
		userEvent.type(getByTestId(testID), "{enter}")
		waitFor(() => {
			expect(_mockFire).toHaveBeenCalled()
			expect(() => actor.registerEnterKey(console.log)).toThrowError()
			done()
		})
	})
	it("will register multiple with a multiListener", (done) => {
		const [mockClick, mockKeyUp, mockKeyDown, mockEnter] = [
			null,
			null,
			null,
			null,
		].map(() => jest.fn())
		const actor = new Interactions()
		actor.registerClickFunction(mockClick)
		actor.registerKeyDownFunction("d", mockKeyDown)
		actor.registerKeyUpFunction("u", mockKeyUp)
		actor.registerEnterKey(mockEnter)
		const { getByTestId } = render(
			<input
				data-testid={testID}
				{...actor.multiListener("onClick", "onKeyDown", "onKeyUp")}
			/>
		)
		userEvent.click(getByTestId(testID))
		userEvent.type(getByTestId(testID), "d", {
			skipClick: true,
		})
		userEvent.type(getByTestId(testID), "u", {
			skipClick: true,
		})
		userEvent.type(getByTestId(testID), "{enter}", {
			skipClick: true,
		})
		waitFor(() => {
			expect(mockClick).toHaveBeenCalledTimes(1)
			expect(mockKeyUp).toHaveBeenCalledTimes(1)
			expect(mockKeyDown).toHaveBeenCalledTimes(1)
			expect(mockEnter).toHaveBeenCalledTimes(1)
			done()
		})
	})
	it("will register a control key press as different from a regular key press", (done) => {
		const [mockCtrl, mockNormal] = [null, null].map(() => jest.fn())
		const actor = new Interactions()
		actor.registerKeyDownFunction("s", mockNormal)
		actor.registerKeyDownFunction("s", mockCtrl, {
			ctrlOrMeta: true,
		})
		const { getByTestId } = render(
			<input data-testid={testID} onKeyDown={(e) => actor.listen(e)} />
		)
		userEvent.type(getByTestId(testID), "s")
		userEvent.type(getByTestId(testID), "{ctrl}s")
		waitFor(() => {
			expect(mockCtrl).toHaveBeenCalledTimes(1)
			expect(mockNormal).toHaveBeenCalledTimes(1)
			done()
		})
	})
	it("will allow options for an enter key press", (done) => {
		const mockCtlr = jest.fn()
		const actor = new Interactions()
		actor.registerEnterKey(mockCtlr, {
			ctrlOrMeta: true,
		})
		const { getByTestId } = render(
			<input data-testid={testID} onKeyUp={(e) => actor.listen(e)} />
		)
		userEvent.type(getByTestId(testID), "{enter}")
		userEvent.type(getByTestId(testID), "{ctrl}{enter}")
		waitFor(() => {
			expect(mockCtlr).toHaveBeenCalledTimes(1)
			done()
		})
	})
	it("will register and fire a touch start event and throw an error on a duplicate", (done) => {
		const actor = new Interactions()
		actor.registerTouchStartFunction(_mockFire)
		const { getByTestId } = render(
			<button
				data-testid={testID}
				onTouchStart={(e) => actor.listen(e)}
			/>
		)
		fireEvent.touchStart(getByTestId(testID))
		expect(_mockFire).toHaveBeenCalled()
		expect(() =>
			actor.registerTouchStartFunction(console.log)
		).toThrowError()
		done()
	})
	it("will register and fire a touch end event and throw an error on a duplicate", (done) => {
		const actor = new Interactions()
		actor.registerTouchEndFunction(_mockFire)
		const { getByTestId } = render(
			<button data-testid={testID} onTouchEnd={(e) => actor.listen(e)} />
		)
		fireEvent.touchEnd(getByTestId(testID))
		expect(_mockFire).toHaveBeenCalled()
		expect(() => actor.registerTouchEndFunction(console.log)).toThrowError()
		done()
	})
})
