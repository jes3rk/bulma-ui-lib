import { exists, ifElseBlank, simpleHash } from '../src/publicUtilities'

describe('Testing the exists function', () => {
	it('returns false when passing a null or undefined value', () => {
		;[null, undefined].forEach((v) => expect(exists(v)).toEqual(false))
	})
	it('returns a true value for primitives', () => {
		;[
			192,
			12.345,
			'hello world',
			true,
			false,
			{},
			[],
			console.log,
		].forEach((v) => expect(exists(v)).toEqual(true))
	})
})

describe('Testing the simpleHash function', () => {
	it('will return a unique string value for all string passed in', () => {
		const strings = [
			'a',
			'aa',
			'aaa',
			'asdlsakfds',
			'hello world',
			'I am the walrus',
			'asdlkjdfsajgjoowoe',
			'sdjakalfoslald',
		]
		const s = new Set<string>(strings.map((str) => simpleHash(str)))
		expect(s.size).toEqual(strings.length)
	})
	it('will return a value of blank for an empty string', () => {
		expect('').toEqual('')
	})
	it('will throw an error for any value not a string', () => {
		const nonStrings = [1, 2.3, true, null, undefined, {}, [], console.log]
		nonStrings.forEach((ns) => {
			expect(() => simpleHash(ns as string)).toThrow()
		})
	})
})

describe('Testing the ifElseBlank function', () => {
	it('will return the given value with a true test', () => {
		const val = 'hello world'
		expect(ifElseBlank(true, val)).toEqual(val)
	})
	it('will return a blank, empty string with a false test', () => {
		const val = 'hello world'
		expect(ifElseBlank(false, val)).toEqual('')
	})
})
