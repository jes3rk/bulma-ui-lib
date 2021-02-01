import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { Input, TextInput } from "../src/Input";

describe("Testing the base input", () => {
    afterEach(() => {
        cleanup();
    });
    it("renders an input element with a class of \"input\"", () => {
        const testid = "Hello world";
        const { getByTestId } = render(<Input data-testid={testid} />);
        expect(getByTestId(testid)).toBeInTheDocument();
        expect(getByTestId(testid)).toHaveAttribute('class', 'input');
    });
    it('renders an input with a passed classname', () => {
        const testid = "Hello world";
        const className = "newClass";
        const { getByTestId } = render(<Input className={className} data-testid={testid} />);
        expect(getByTestId(testid)).toHaveAttribute('class', expect.stringContaining(className));
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
})