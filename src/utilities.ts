/**
 * Capitalize the first letter of the provided string and return a new copy
 * @param str String to capitalize
 */
export const capitalizeString = (str: string): string =>
	str.replace(/^\w/, (c) => c.toUpperCase())

/**
 * Determine whether or not the passed value exists according to:
 *  - not Null
 *  - not undefined
 * @param value Value to check on
 */
export const exists = (value: unknown): boolean => {
	return value !== null && value !== undefined
}

/**
 * Generate a GUID for use throughout the application, particularly useful for the key prop in repeating lists
 */
export const guid = (): string => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0
		const v = c == "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

/**
 * Internal object for handling logging functionality
 */
export const logging = {
	dev: (message: unknown): void => {
		if (process.env.NODE_ENV === "development") console.log(message)
	},
	error: (message: unknown): void => console.error(message),
	info: (message: unknown): void => console.log(message),
	warn: (message: unknown): void => console.warn(message),
}

export const parseJWT = (token: string): Record<string, unknown> => {
	const b64DecodeUnicode = (str: string) =>
		decodeURIComponent(
			Array.prototype.map
				.call(
					atob(str),
					(c: string) =>
						"%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
				)
				.join("")
		)

	const _parseJwt = (t: string) =>
		JSON.parse(
			b64DecodeUnicode(
				t.split(".")[1].replace("-", "+").replace("_", "/")
			)
		)
	return _parseJwt(token)
}

/**
 * Parse a URL query string into an object of key value pairs
 * @param queryString URL query string. Normally window.location.searc
 */
export const parseURLQuery = (
	queryString: string
): { [key: string]: string | number } => {
	const queryArr: string[] = queryString.replace("?", "").split("&")
	const ret: { [key: string]: string | number } = {}
	queryArr.forEach((q) => {
		const sQ: string[] = q.split("=")
		if (sQ.length >= 2) {
			const key: string = decodeURIComponent(sQ[0])
			let val: string | number = decodeURIComponent(sQ.slice(1).join())
			const intVal: number = parseInt(val)
			if (!isNaN(intVal)) val = intVal
			ret[key] = val
		}
	})
	return ret
}

/**
 * Determine whether or not the passed string is viable according to:
 *  - exists (see exists function)
 *  - length greater than 0
 * @param value String to check on
 */
export const viableString = (value: string): boolean => {
	return exists(value) && value.length > 0
}

/**
 * Return a date object that is calculated from the provided date param and a time differential. Mirrors python's timedelta function
 * @param date
 * @param timeDiff
 */
export const timedelta = (
	date: Date,
	timeDiff: {
		seconds?: number
		minutes?: number
		hours?: number
		days?: number
	}
): Date => {
	let _dateToSeconds: number = date.getTime() / 1000
	if (timeDiff.seconds) _dateToSeconds += timeDiff.seconds
	if (timeDiff.minutes) _dateToSeconds += timeDiff.minutes * 60
	if (timeDiff.hours) _dateToSeconds += timeDiff.hours * 60 * 60
	if (timeDiff.days) _dateToSeconds += timeDiff.days * 24 * 60 * 60
	return new Date(_dateToSeconds * 1000)
}

/**
 * Check whether the provided date is within the timeDiff of the reference point. Only works in the past.
 * @param dateToTest
 * @param timeDiff
 * @param referencePoint
 */
export const isWithin = (
	dateToTest: Date,
	timeDiff: {
		seconds?: number
		minutes?: number
		hours?: number
		days?: number
	},
	referencePoint: Date = new Date()
): boolean => {
	const deltaDate = timedelta(referencePoint, timeDiff)
	return new Date(dateToTest).getTime() >= deltaDate.getTime()
}

export class CalledIn {
	private static _tracker: Map<string, number> = new Map<string, number>()

	/**
	 * Register a new function with the global called in tracker
	 * @param id Unique id to be used with the function. Can be reused for tracking one function across multiple files/objects
	 * @param timeout Blocking time from one function call to the next in seconds
	 * @param fn Function to register
	 */
	public static register = <T>(
		id: string,
		timeout: number,
		fn: (...args: any[]) => T
	): (() => T) => {
		if (!CalledIn._tracker.has(id)) CalledIn._tracker.set(id, Date.now())
		return function (): T {
			const now = Date.now()
			if (CalledIn._tracker.get(id) + timeout * 1000 < now) {
				CalledIn._tracker.set(id, Date.now())
				return fn.apply(this)
			} else {
				return null
			}
		}
	}
}

/**
 * Generate non-cryptographically secure hashes for simple hash table implmentations
 * @param s String to hash
 * @returns Hashed value
 */
export const simpleHash = (s: string): string => {
	if (typeof s !== "string") throw new Error("Input must be of type string")
	let hash = 0
	for (let i = 0; i < s.length; i++) {
		const char = s.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32bit integer
	}
	return hash.toString()
}
/**
 * Use the given test to determine whether to return the value or a blank, empty string
 * @param test Test to perform
 * @param value Value to return if test is true
 * @returns string
 */
export const ifElseBlank = (test: boolean, value: string): string =>
	test ? value : ""
