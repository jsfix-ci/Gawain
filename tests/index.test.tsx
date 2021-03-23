import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AutoComplete, { RefAutoCompleteProps } from "../src";

describe("<AutoComplete />", () => {
  describe("render", () => {
    test("AutoComplete with custom Input render perfectly", () => {
      const options = [
        { label: "12345", value: "12345" },
        { label: "23456", value: "23456" },
        { label: "34567", value: "34567" },
      ];
      const { getByRole, container } = render(
        <AutoComplete
          options={options}
          getPopupContainer={(t) => t.parentNode as HTMLElement}
        >
          <textarea />
        </AutoComplete>
      );

      const textarea = getByRole("textbox");
      fireEvent.input(textarea, { target: { value: "1" } });
      const optionsElements = container.querySelectorAll(".f-dropdown-option");

      expect(textarea.className).toContain("f-autocomplete-textarea");
      expect(optionsElements.length).toBe(3);
    });

    test("legacy AutoComplete.Option should be compatiable", () => {
      const { getAllByRole, baseElement } = render(
        <AutoComplete>
          <AutoComplete.Option value="111">111</AutoComplete.Option>
          <AutoComplete.Option value="222">222</AutoComplete.Option>
        </AutoComplete>
      );

      const input = getAllByRole("textbox");
      fireEvent.input(input[0], { target: { value: "1" } });
      const optionsElements = baseElement.querySelectorAll(
        ".f-dropdown-option"
      );

      expect(input.length).toBe(1);
      expect(optionsElements.length).toBe(2);
    });
  });

  describe("prop", () => {
    describe("prop: options", () => {
      test("AutoComplete should work when options is object array", () => {
        const options = [
          { text: "text", value: "value" },
          { text: "abc", value: "xxx" },
        ];
        const { getByRole, baseElement } = render(
          <AutoComplete options={options} />
        );

        const input = getByRole("textbox");
        fireEvent.input(input, { target: { value: "v" } });
        const optionsElements = baseElement.querySelectorAll(
          ".f-dropdown-option"
        );

        expect(input.className).toContain("f-autocomplete-input");
        expect(optionsElements.length).toBe(2);
      });
    });

    test("prop: onFocus", () => {
      const handleFocus = jest.fn();
      const { getByRole } = render(<AutoComplete onFocus={handleFocus} />);

      const textarea = getByRole("textbox");
      textarea.focus();

      expect(handleFocus).toHaveBeenCalled();
    });

    test("prop: onBlur", () => {
      const handleBlur = jest.fn();
      const { getByRole } = render(<AutoComplete onBlur={handleBlur} />);

      const textarea = getByRole("textbox");
      textarea.focus();
      textarea.blur();

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe("ref", () => {
    test("child.ref instance should support be focused and blurred", () => {
      let inputRef: RefAutoCompleteProps | null = null;
      render(
        <AutoComplete
          options={[]}
          ref={(node) => {
            inputRef = node;
          }}
        />
      );

      expect(typeof inputRef!.focus).toBe("function");
      expect(typeof inputRef!.blur).toBe("function");
    });
  });
});
