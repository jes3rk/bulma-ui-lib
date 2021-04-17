import { cleanup, render } from '@testing-library/react'
import * as React from 'react'
import {
	ControlField,
	propDefaulter,
	stringPropCombineDefaulter,
} from '../src/BaseElements'

describe('Testing the ControlField wrapper', () => {
	afterEach(() => {
		cleanup()
	})
	it('will match an inline snapshot for a vertical label', () => {
		const { asFragment } = render(
			<ControlField name="Testing">
				<span>Hello World</span>
			</ControlField>
		)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <div
                class="field "
              >
                <label
                  class="label"
                >
                  Testing
                </label>
                <div
                  class="field-body"
                >
                  <div
                    class="control  "
                  >
                    <span>
                      Hello World
                    </span>
                  </div>
                </div>
              </div>
            </DocumentFragment>
        `)
	})
	it('will match an inline snapshot for a horizontal field', () => {
		const { asFragment } = render(
			<ControlField horizontal={true} name="Testing">
				<span>Hello World</span>
			</ControlField>
		)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <div
                class="field is-horizontal"
              >
                <div
                  class="field-label is-normal"
                >
                  <label
                    class="label"
                  >
                    Testing
                  </label>
                </div>
                <div
                  class="field-body"
                >
                  <div
                    class="control  "
                  >
                    <span>
                      Hello World
                    </span>
                  </div>
                </div>
              </div>
            </DocumentFragment>
        `)
	})
	it('will match the inline snapshot when loading', () => {
		const { asFragment } = render(
			<ControlField loading={true} name="testing">
				<span>Hello World</span>
			</ControlField>
		)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <div
                class="field "
              >
                <label
                  class="label"
                >
                  testing
                </label>
                <div
                  class="field-body"
                >
                  <div
                    class="control is-loading "
                  >
                    <span>
                      Hello World
                    </span>
                  </div>
                </div>
              </div>
            </DocumentFragment>
        `)
	})
})

describe('Testing the propDefaulter function', () => {
	it('will return the prop value if it is defined', () => {
		;[1, 2.3, 'hello', false, true, {}, [], console.log].forEach((v) => {
			expect(propDefaulter<typeof v>(v, 'string')).toEqual(v)
		})
	})
	it('will return the default value if prop is undefined', () => {
		expect(propDefaulter<string>(undefined, 'hello world')).toEqual(
			'hello world'
		)
	})
})

describe('Testing the stringPropDefault function', () => {
	it('will return the default string if passed an invalid stringProp', () => {
		const defaultVal = 'hello'
		expect(stringPropCombineDefaulter(undefined, defaultVal)).toEqual(
			defaultVal
		)
	})
	it('will return a compiled value if passed two valid params', () => {
		const defaultVal = 'hello'
		const stringProp = 'world'
		expect(stringPropCombineDefaulter(stringProp, defaultVal)).toEqual(
			`${defaultVal} ${stringProp}`
		)
	})
})
