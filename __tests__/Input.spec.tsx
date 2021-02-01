import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { Input } from "../src/Input";

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
