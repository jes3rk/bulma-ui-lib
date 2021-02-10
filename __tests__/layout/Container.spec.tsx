import { cleanup, render } from '@testing-library/react';
import * as React from 'react';
import { Container } from '../../src/layout/Container';

describe("Testing the container", () => {
    const testID = 'Helloljdflksja';
    afterEach(() => {
        cleanup();
    })
    it('will render a div with the class of "container"', () => {
        const { getByTestId } = render(<Container data-testid={testID}></Container>);
        expect(getByTestId(testID)).toHaveAttribute('class', 'container');
    })
})