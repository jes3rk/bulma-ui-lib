import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import { cleanup, render } from "@testing-library/react";
import { Input, TextInput } from "../../src/inputs/Input";
import { axe } from "jest-axe";

describe("Testing the base input", () => {
    const testid = "Hello world";
    afterEach(() => {
        cleanup();
    });
    it("renders an input element with a class of \"input\"", () => {
        const { getByTestId } = render(<Input data-testid={testid} />);
        expect(getByTestId(testid)).toBeInTheDocument();
        expect(getByTestId(testid)).toHaveAttribute('class', 'input');
    });
    it('renders an input with a passed classname', () => {
        const className = "newClass";
        const { getByTestId } = render(<Input className={className} data-testid={testid} />);
        expect(getByTestId(testid)).toHaveAttribute('class', expect.stringContaining(className));
    })
    it('will render an aria-label if given a name', () => {
        const name = 'My name';
        const { getByTestId } = render(<Input data-testid={testid} name={name} />);
        expect(getByTestId(testid)).toHaveAttribute('name', name);
        expect(getByTestId(testid)).toHaveAttribute('aria-label', name);
    })
    it('will render an aria-label if given an aria-label', () => {
        const name = 'My name';
        const label = 'My label';
        const { getByTestId } = render(<Input aria-label={label} data-testid={testid} name={name} />);
        expect(getByTestId(testid)).toHaveAttribute('name', name);
        expect(getByTestId(testid)).toHaveAttribute('aria-label', label);
    })
    it('will include a class of "is-rounded" if property is passed in', () => {
        const { getByTestId } = render(<Input data-testid={testid} rounded={true} />);
        expect(getByTestId(testid)).toHaveAttribute('class', expect.stringContaining('is-rounded'));
    })
});
describe('Testing the TextInput', () => {
    afterEach(() => {
        cleanup();
    })
    it('renders an input element with a type of "text"', () => {
        const testID = 'hello world';
        const { getByTestId } = render(<TextInput data-testid={testID} />);
        expect(getByTestId(testID)).toBeInTheDocument();
        expect(getByTestId(testID)).toHaveAttribute('type', 'text');
    })
    it('renders an input element with a type of "password"', () => {
        const testID = 'hello world';
        const { getByTestId } = render(<TextInput data-testid={testID} type='password'/>);
        expect(getByTestId(testID)).toHaveAttribute('type', 'password');
    })
    it('is nominally accessible as a text input', done => {
        const html = ReactDOMServer.renderToString(<main><TextInput name='accessable-input' /></main>);
        axe(html).then(res => {
            expect(res).toHaveNoViolations();
            done();
        })
    })
})