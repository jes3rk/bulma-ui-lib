import * as React from 'react';
import {stringPropDefaulter} from '../src/BaseElements';

describe('Testing the stringPropDefault function', () => {
    it('will return the default string if passed an invalid stringProp', () => {
        const defaultVal = 'hello';
        expect(stringPropDefaulter(undefined, defaultVal)).toEqual(defaultVal)
    })
    it('will return a compiled value if passed two valid params', () => {
        const defaultVal = 'hello';
        const stringProp = 'world';
        expect(stringPropDefaulter(stringProp, defaultVal)).toEqual(`${defaultVal} ${stringProp}`);
    })
})