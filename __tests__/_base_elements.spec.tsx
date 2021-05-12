import {
	BaseHTMLProps,
	filterObjectProps,
	makeId,
	sanitizeProps,
} from "../src/_base_elements"
import type { StringDict } from "../src/types"

describe("Testing makeTestId", () => {
	it("returns a string when not passed a value", () => {
		const output = makeId()
		expect(output).toBeTruthy()
		expect(typeof output).toBe("string")
	})

	it("returns the string passed to it", () => {
		const input = "my string"
		expect(makeId(input)).toEqual(input)
	})
})

describe("Testing filterObjectProps", () => {
	it("returns the correct type", () => {
		const output: StringDict<string> = filterObjectProps(
			{
				test: "hello",
				objecy: "world",
			},
			["test", "objecy"]
		)
		expect(typeof output).toEqual("object")
	})
	it("returns a filtered object", () => {
		const allowed: string[] = ["hello", "world"]
		const output: StringDict<string> = filterObjectProps(
			{
				hello: "testing",
				world: "my react app",
				remove: "me",
			},
			allowed
		)
		allowed.forEach((k) => {
			expect(output).toHaveProperty(k)
		})
		expect(output).not.toHaveProperty("remove")
	})
	it("doesn't include properties that aren't in the object", () => {
		const allowed: string[] = ["hello", "world", "nonexistent"]
		const output: StringDict<string> = filterObjectProps(
			{
				hello: "testing",
				world: "my react app",
			},
			allowed
		)
		expect(output).not.toHaveProperty("nonexistent")
	})
	it("removes props in the denied props list", () => {
		const denied: string[] = ["world"]
		const output: StringDict<string> = filterObjectProps(
			{
				hello: "testing",
				world: "remove me",
			},
			null,
			denied
		)
		expect(output).not.toHaveProperty("world")
		expect(output).toHaveProperty("hello")
	})
	it("does nothing to an object if no allowed or denied props", () => {
		const output: StringDict<string> = filterObjectProps({
			hello: "testing",
			world: "me",
		})
		expect(output).toHaveProperty("hello")
		expect(output).toHaveProperty("world")
	})
})
describe("Testing sanitizeProps", () => {
	it("merges the two props objects", () => {
		const obj1: BaseHTMLProps = {
			"aria-label": "hello",
		}
		const obj2: BaseHTMLProps = {
			id: "world",
		}
		const output = sanitizeProps(obj1, obj2)
		expect(output).toHaveProperty("aria-label", obj1["aria-label"])
		expect(output).toHaveProperty("id", obj2.id)
	})
	it("will convert the name to an aria-label if none is passed", () => {
		const obj: BaseHTMLProps = {
			name: "Hello!",
		}
		const output = sanitizeProps(obj, {})
		expect(output).toHaveProperty("aria-label", obj["name"])
	})
	it("will create an id property if none is passed", () => {
		const obj: BaseHTMLProps = {
			name: "Hello",
		}
		const output = sanitizeProps(obj, {})
		expect(output).toHaveProperty("id")
	})
	it("will auto-merge className properties of two objects", () => {
		const obj1: BaseHTMLProps = {
			className: "hello",
		}
		const obj2: BaseHTMLProps = {
			className: "world",
		}
		const output = sanitizeProps(obj1, obj2)
		expect(output.className).toEqual("hello world")
	})
})
