import { TestScheduler } from "rxjs/testing";

import useRxInput from "../src/hooks/useRxInput";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe("useRxInput", () => {
  it("input should debounce 500ms", () => {
    const [getDebounced$] = useRxInput();

    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers;

      const input = hot<any>("a 300ms b", {
        a: { target: { value: "a" } },
        b: { target: { value: "b" } },
      });
      const expected = "- 800ms b";
      const values = "b";

      const debounced$ = getDebounced$(input);
      expectObservable(debounced$).toBe(expected, values);
    });
  });
});
