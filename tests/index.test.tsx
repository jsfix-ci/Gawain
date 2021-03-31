import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AutoComplete, { RefAutoCompleteProps } from "../src";

describe("<AutoComplete />", () => {
  const mockOptions = [
    { label: "12345", value: "12345" },
    { label: "23456", value: "23456" },
    { label: "34567", value: "34567" },
  ];

  describe("render", () => {
    it("with custom Input render perfectly", () => {
      const { getByRole, container } = render(
        <AutoComplete
          options={mockOptions}
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

    it("legacy AutoComplete.Option should be compatiable", () => {
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

  describe("prop:allowClear", () => {
    it("should render clear icon when input value", () => {
      const { getByRole, container } = render(
        <AutoComplete allowClear options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(
        container.querySelector(".f-autocomplete-clear-icon")
      ).not.toBeNull();
    });

    it("click clear icon should clear value", () => {
      const { container } = render(
        <AutoComplete allowClear options={mockOptions} />
      );
      const input: HTMLInputElement | null = container.querySelector(
        ".f-autocomplete-input"
      );

      fireEvent.input(input!, { target: { value: "1" } });
      const clearIcon = container.querySelector(".f-autocomplete-clear-icon");
      clearIcon && fireEvent.mouseDown(clearIcon);

      expect(input).not.toBe(null);
      expect(clearIcon).not.toBe(null);
      expect(input!.value).toBe("");
    });
  });

  describe("prop: options", () => {
    it("should work when options is object array", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete options={mockOptions} />
      );

      const input = getByRole("textbox");
      fireEvent.input(input, { target: { value: "1" } });
      const optionsElements = baseElement.querySelectorAll(
        ".f-dropdown-option"
      );

      expect(input.className).toContain("f-autocomplete-input");
      expect(optionsElements.length).toBe(3);
    });
  });

  describe("prop: onFocus", () => {
    it("show call onFocus when it was focused", () => {
      const handleFocus = jest.fn();
      const { getByRole } = render(<AutoComplete onFocus={handleFocus} />);

      getByRole("textbox").focus();

      expect(handleFocus).toHaveBeenCalled();
    });
  });

  describe("prop: onBlur", () => {
    it("show call onBlur when it was blurred", () => {
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
