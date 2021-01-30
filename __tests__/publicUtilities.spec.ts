import { exists } from '../src/publicUtilities'

describe('Testing the exists function', () => {
    it('returns false when passing a null or undefined value', () => {
        [null, undefined].forEach(v => expect(exists(v)).toEqual(false));
    })
    it('returns a true value for primitives', () => {
        [192, 12.345, 'hello world', true, false, {}, [], console.log]
            .forEach(v => expect(exists(v)).toEqual(true));
    })
})