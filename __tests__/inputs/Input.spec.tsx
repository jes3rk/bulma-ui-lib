import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import { cleanup, render, waitFor } from "@testing-library/react";
import { Input, TextInput } from "../../src/inputs/Input";
import { axe } from "jest-axe";
import userEvent from '@testing-library/user-event';
import Interactable from "../../src/Interactions";

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
    it('will run an onClick event if clicked', done => {
        const clicker = jest.fn();
        const { getByTestId } = render(<Input data-testid={testid} onClick={clicker}/>);
        userEvent.click(getByTestId(testid));
        waitFor(() => {
            expect(clicker).toHaveBeenCalled();
            done()
        })
    })
    it('will run an onKeyDown event if a key is pressed', done => {
        const clicker = jest.fn();
        const { getByTestId } = render(<Input data-testid={testid} onKeyDown={clicker}/>);
        userEvent.type(getByTestId(testid), '{enter}');
        waitFor(() => {
            expect(clicker).toHaveBeenCalled();
            done()
        })
    })
    it('will run an onKeyUp event if clicked', done => {
        const clicker = jest.fn();
        const { getByTestId } = render(<Input data-testid={testid} onKeyUp={clicker}/>);
        userEvent.type(getByTestId(testid), '{enter}');
        waitFor(() => {
            expect(clicker).toHaveBeenCalled();
            done()
        })
    })
    it('will use an actor rather than an included on click function', done => {
        const actor = new Interactable();
        const actorClicker = jest.fn();
        const onClicker = jest.fn();
        actor.registerClickFunction(actorClicker);
        const { getByTestId } = render(<Input data-testid={testid} actor={actor} onClick={onClicker}/>);
        userEvent.click(getByTestId(testid));
        waitFor(() => {
            expect(actorClicker).toHaveBeenCalled();
            expect(onClicker).not.toHaveBeenCalled();
            done()
        })
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