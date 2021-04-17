import * as React from 'react'
import { cleanup, render } from '@testing-library/react'
import { H1, H2, H3, H4, H5, H6 } from '../../src/headings/Headings'

describe('Testing the Heading component', () => {
	afterEach(() => {
		cleanup()
	})
	it('will render an H1 element', () => {
		const { asFragment } = render(<H1>Hello World</H1>)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <h1
                class="is-size-1"
              >
                Hello World
              </h1>
            </DocumentFragment>
        `)
	})
	it('will render an H2 element', () => {
		const { asFragment } = render(<H2>Hello World</H2>)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <h2
                class="is-size-2"
              >
                Hello World
              </h2>
            </DocumentFragment>
        `)
	})
	it('will render an H3 element', () => {
		const { asFragment } = render(<H3>Hello World</H3>)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <h3
                class="is-size-3"
              >
                Hello World
              </h3>
            </DocumentFragment>
        `)
	})
	it('will render an H4 element', () => {
		const { asFragment } = render(<H4>Hello World</H4>)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <h4
                class="is-size-4"
              >
                Hello World
              </h4>
            </DocumentFragment>
        `)
	})
	it('will render an H5 element', () => {
		const { asFragment } = render(<H5>Hello World</H5>)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <h5
                class="is-size-5"
              >
                Hello World
              </h5>
            </DocumentFragment>
        `)
	})
	it('will render an H6 element', () => {
		const { asFragment } = render(<H6>Hello World</H6>)
		expect(asFragment()).toMatchInlineSnapshot(`
            <DocumentFragment>
              <h6
                class="is-size-6"
              >
                Hello World
              </h6>
            </DocumentFragment>
        `)
	})
})
