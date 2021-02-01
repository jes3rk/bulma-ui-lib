import * as React from "react";
import { propDefaulter, stringPropCombineDefaulter } from "../src/BaseElements";

describe('Testing the propDefaulter function', () => {
  it('will return the prop value if it is defined', () => {
    [1, 2.3, 'hello', false, true, {}, [], console.log].forEach(v => {
      expect(propDefaulter<typeof v>(v, 'string')).toEqual(v);
    })
  })
  it('will return the default value if prop is undefined', () => {
    expect(propDefaulter<string>(undefined, 'hello world')).toEqual('hello world');
  })
})

describe("Testing the stringPropDefault function", () => {
  it("will return the default string if passed an invalid stringProp", () => {
    const defaultVal = "hello";
    expect(stringPropCombineDefaulter(undefined, defaultVal)).toEqual(defaultVal);
  });
  it("will return a compiled value if passed two valid params", () => {
    const defaultVal = "hello";
    const stringProp = "world";
    expect(stringPropCombineDefaulter(stringProp, defaultVal)).toEqual(
      `${defaultVal} ${stringProp}`
    );
  });
});