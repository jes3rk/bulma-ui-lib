import hello from '../src/hello';

describe('Testing the Hello Component', () => {
    it('Says Hello', () => {
        expect(hello()).toEqual('Hello World');
    })
})