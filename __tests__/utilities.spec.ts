import {
	capitalizeString,
	exists,
	guid,
	isWithin,
	logging,
	parseURLQuery,
	simpleHash,
	timedelta,
	viableString,
} from "../src/utilities"

describe("Testing the capitalizeString function", () => {
	it("returns the capitalized version of a normal string", () => {
		expect(capitalizeString("hello")).toEqual("Hello")
	})
	it("returns the same value if passed a capitalized string", () => {
		const str = "Hello"
		expect(capitalizeString(str)).toEqual(str)
	})
	it("returns the same string if first char is a numeric", () => {
		const str = "1sldkfj"
		expect(capitalizeString(str)).toEqual(str)
	})
})

describe("Testing the exists function", () => {
	it("returns false if given null, undefined values", () => {
		;[null, undefined].forEach((v) => {
			expect(exists(v)).toBe(false)
		})
	})
	it("returns true if given a number, string, boolean, function, object, arry", () => {
		;[123, "hello world", "", true, false, console.log, {}, []].forEach(
			(v) => {
				expect(exists(v)).toBe(true)
			}
		)
	})
})
describe("Testing the guid function", () => {
	it("matches the valid guid format", () => {
		const testString: string = guid()
		const validRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
		expect(validRegex.test(testString)).toBe(true)
	})
	it("does not repeat if called sequentially", () => {
		const testLen = 1000
		expect(new Set([...Array(testLen)].map(() => guid())).size).toBe(
			testLen
		)
	})
})
describe("Testing the logging function", () => {
	afterEach(() => {
		jest.restoreAllMocks()
	})
	it("runs console.log if in development", () => {
		const old: string = process.env.NODE_ENV
		process.env.NODE_ENV = "development"
		const spy = jest.spyOn(console, "log").mockImplementation()
		logging.dev("message")
		expect(spy).toHaveBeenCalled()
		process.env.NODE_ENV = old
	})
	it("doesn't run console.log if non-dev", () => {
		process.env.NODE_ENV = "production"
		const spy = jest.spyOn(console, "log").mockImplementation()
		logging.dev("message")
		expect(spy).not.toHaveBeenCalled()
		process.env.NODE_ENV = "development"
	})
	it("runs console.error for error messages", () => {
		const spy = jest.spyOn(console, "error").mockImplementation()
		logging.error("message")
		expect(spy).toHaveBeenCalled()
	})
	it("runs console.log for info messages", () => {
		const spy = jest.spyOn(console, "log").mockImplementation()
		logging.info("message")
		expect(spy).toHaveBeenCalled()
	})
	it("runs console.warn for warn messages", () => {
		const spy = jest.spyOn(console, "warn").mockImplementation()
		logging.warn("message")
		expect(spy).toHaveBeenCalled()
	})
})
describe("Testing the parseURLString", () => {
	it("returns a set of key:value pairs for string params", () => {
		const queryString = "?hello=world&mine=yours"
		const response: { [key: string]: string | number } = parseURLQuery(
			queryString
		)
		expect(response["hello"]).toEqual("world")
		expect(response["mine"]).toEqual("yours")
		expect(Object.keys(response).length).toEqual(2)
	})
	it("will parse into an number any numbers in the param", () => {
		const queryString = "?hello=world&mine=1"
		const response: { [key: string]: string | number } = parseURLQuery(
			queryString
		)
		expect(response["hello"]).toEqual("world")
		expect(response["mine"]).toEqual(1)
		expect(Object.keys(response).length).toEqual(2)
	})
})
describe("Testing the viableString function", () => {
	it("returns true for a non-blank string", () => {
		expect(viableString("Hello World")).toBe(true)
	})
	it("returns false for null, undefined, or blank strings", () => {
		;["", null, undefined].forEach((v) => {
			expect(viableString(v)).toBe(false)
		})
	})
})
describe("Testing the timedelta function", () => {
	it("will return the same time if passed no diffs", () => {
		const now = new Date()
		expect(timedelta(now, {})).toEqual(now)
	})
	it("will return a date 10 seconds in the future", () => {
		const now = new Date()
		now.setSeconds(0)
		const future = timedelta(now, { seconds: 10 })
		expect(now.getSeconds() + 10).toEqual(future.getSeconds())
	})
	it("will return a date 10 minutes in the future", () => {
		const now = new Date()
		now.setMinutes(10)
		const future = timedelta(now, { minutes: 10 })
		expect(now.getMinutes() + 10).toEqual(future.getMinutes())
	})
	it("will return a date 2 hours in the future", () => {
		const now = new Date()
		now.setHours(2)
		const future = timedelta(now, { hours: 2 })
		expect(now.getHours() + 2).toEqual(future.getHours())
	})
	it("will return a date 2 days in the future", () => {
		const now = new Date()
		now.setDate(3)
		const future = timedelta(now, { days: 2 })
		expect(now.getDate() + 2).toEqual(future.getDate())
	})
})
describe("Testing the isWithin function", () => {
	it("returns true for a date", () => {
		const [now, past] = [new Date(), new Date()]
		past.setHours(now.getHours() - 1)
		expect(isWithin(past, { hours: -2 })).toEqual(true)
	})
	it("returns false for an older date", () => {
		const [now, past] = [new Date(), new Date()]
		now.setHours(7)
		past.setHours(0)
		expect(isWithin(past, { hours: -1 }, now)).toEqual(false)
	})
})
describe("Testing the simple hash function", () => {
	it("returns a string", () => {
		expect(typeof simpleHash("hello world")).toEqual("string")
	})
	it("will throw an error if not given a string", () => {
		expect(() => simpleHash((false as unknown) as string)).toThrowError()
	})
})
