import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AutoComplete, { RefAutoCompleteProps, OptionData } from "../src";

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

    it("click clear icon should clear input value", () => {
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
      expect(input?.value).toBe("");
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

  describe("prop: defaultActiveFirstOption ", () => {
    it("when defaultActiveFirstOption is false and input value is not equal to first option's value it should not own background-color", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete defaultActiveFirstOption={false} options={mockOptions} />
      );
      const input = getByRole("textbox");

      fireEvent.input(input, { target: { value: "k" } });
      const optionsElements = baseElement.querySelectorAll(
        ".f-dropdown-option"
      );

      expect(optionsElements[0].className).not.toContain(
        "f-dropdown-option-selected"
      );
    });
  });

  describe("prop: defaultOpen", () => {
    it("if defaultOpen is true and options is not empty, show the dropdown", () => {
      const { baseElement } = render(
        <AutoComplete defaultOpen options={mockOptions} />
      );

      const optionsElements = baseElement.querySelectorAll(
        ".f-dropdown-option"
      );

      expect(optionsElements.length).toBe(3);
    });
  });

  describe("prop: dropdownClassName", () => {
    it("dropdown className will include the given string", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete dropdownClassName="test" options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const wrapper = baseElement.querySelector(".f-dropdown-wrapper");

      expect(wrapper?.className).toContain("test");
    });
  });

  describe("prop: dropdownMatchSelectWidth", () => {
    it("when dropdownMatchSelectWidth is number, the width of dropdown will be equal to the number", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete dropdownMatchSelectWidth={300} options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const wrapper: HTMLDivElement | null = baseElement.querySelector(
        ".f-dropdown-wrapper"
      );

      expect(wrapper?.style.width).toEqual("300px");
    });
  });

  describe("prop: filterOption", () => {
    it("if filterOption return false, dropdown will not be rendered", () => {
      const test = () => false;
      const { getByRole, baseElement } = render(
        <AutoComplete filterOption={test} options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(baseElement.querySelector(".f-dropdown-wrapper")).toBeNull();
      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toEqual(
        0
      );
    });

    it("filterOption can filter option depends on function", () => {
      const test = (value: string, option: OptionData) => {
        return option.value !== "12345";
      };
      const { getByRole, baseElement } = render(
        <AutoComplete filterOption={test} options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const optionsElements = baseElement.querySelectorAll(
        ".f-dropdown-option"
      );

      expect(optionsElements.length).toBe(2);
      optionsElements.forEach((e) => {
        expect(e.innerHTML).not.toBe("12345");
      });
    });
  });

  describe("prop: getPopupContainer", () => {
    it("dropdown should be mounted  under getPopupContainer() return dom", () => {
      const getPopupContainer = (n: HTMLElement) => {
        return document.querySelector("#test") as HTMLElement;
      };
      const { getByRole, baseElement } = render(
        <>
          <div id="test">Test</div>
          <AutoComplete
            options={mockOptions}
            getPopupContainer={getPopupContainer}
          />
        </>
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const portal = baseElement.querySelector(".f-autocomplete-portal");

      expect((portal?.parentNode as HTMLDivElement).id).toBe("test");
    });
  });

  describe("prop: notFoundContent", () => {
    it("render notFoundContent when options are empty", () => {
      const content = <div>Test</div>;
      const { baseElement } = render(
        <AutoComplete open notFoundContent={content} />
      );

      const wrapper = baseElement.querySelector(".f-dropdown-wrapper");

      expect(wrapper?.children.length).toBe(1);
      expect(wrapper?.children[0]).toBeInstanceOf(HTMLDivElement);
      expect(wrapper?.children[0].innerHTML).toBe("Test");
    });
  });

  describe("prop: onSelect", () => {
    it("select an option should call onSelect function", () => {
      const onSelect = jest.fn((value, option) => ({ value, option }));
      const { getByRole, baseElement } = render(
        <AutoComplete options={mockOptions} onSelect={onSelect} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const options = baseElement.querySelectorAll(".f-dropdown-option");
      fireEvent.mouseDown(options[0]);

      expect(onSelect.mock.calls.length).toBe(1);
      expect(onSelect.mock.calls[0][0]).toBe("12345");
      expect(onSelect.mock.calls[0][1]).toEqual({
        label: "12345",
        value: "12345",
      });
      expect(onSelect.mock.results[0].value).toEqual({
        option: { label: "12345", value: "12345" },
        value: "12345",
      });
    });
  });

  describe("prop: onChange", () => {
    it("input value should call onChange function", () => {
      const onChange = jest.fn((x) => x);
      const { getByRole } = render(
        <AutoComplete options={mockOptions} onChange={onChange} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toBe("1");
      expect(onChange.mock.results[0].value).toBe("1");
    });

    it("select an option should call onChange function", () => {
      const onChange = jest.fn((value) => value);
      const { getByRole } = render(
        <AutoComplete options={mockOptions} onChange={onChange} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toBe("1");
      expect(onChange.mock.results[0].value).toBe("1");
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
