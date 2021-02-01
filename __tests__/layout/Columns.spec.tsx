import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Column, ColumnContainer } from '../../src/layout/Columns';

describe('Testing the column container', () => {
    const testId = 'asdfjkldasdf';
    afterEach(() => {
        cleanup();
    })
    it('renders a div with a class of "columns"', () => {
        const { getByTestId } = render(<ColumnContainer data-testid={testId}></ColumnContainer>);
        expect(getByTestId(testId)).toHaveAttribute('class', 'columns');
    })
    it('renders a div with a class "columns" and any additional classes', () => {
        const classNames = 'dadfjks sdkf';
        const { getByTestId } = render(<ColumnContainer className={classNames} data-testid={testId} ></ColumnContainer>);
        expect(getByTestId(testId)).toHaveAttribute('class', expect.stringContaining(classNames));
    })
})
describe('Testing the column', () => {
    const testId = 'asdfjkldasdf';
    afterEach(() => {
        cleanup();
    })
    it('renders a div with a class of "columns"', () => {
        const { getByTestId } = render(<Column data-testid={testId}></Column>);
        expect(getByTestId(testId)).toHaveAttribute('class', 'column');
    })
    it('renders a div with a class "columns" and any additional classes', () => {
        const classNames = 'dadfjks sdkf';
        const { getByTestId } = render(<Column className={classNames} data-testid={testId} ></Column>);
        expect(getByTestId(testId)).toHaveAttribute('class', expect.stringContaining(classNames));
    })
})