import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AutoComplete, { RefAutoCompleteProps, OptionData, Option } from "../src";

describe("<AutoComplete />", () => {
  const mockOptions = [
    { label: "12345", value: "12345" },
    { label: "23456", value: "23456" },
    { label: "34567", value: "34567" },
  ];

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

      expect(input.className).toContain("f-autocomplete-input");
      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(3);
    });
  });

  describe("prop: onFocus", () => {
    it("show call onFocus when it was focused", () => {
      const onFocus = jest.fn();
      const { getByRole } = render(<AutoComplete onFocus={onFocus} />);

      getByRole("textbox").focus();

      expect(onFocus).toBeCalledTimes(1);
    });
  });

  describe("prop: onBlur", () => {
    it("show call onBlur when it was blurred", () => {
      const onBlur = jest.fn();
      const { getByRole } = render(<AutoComplete onBlur={onBlur} />);

      const textarea = getByRole("textbox");
      textarea.focus();
      textarea.blur();

      expect(onBlur).toBeCalledTimes(1);
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

      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(3);
    });
  });

  describe("prop: dropdownClassName", () => {
    it("dropdown className will include the given string", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete dropdownClassName="test" options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(
        baseElement.querySelector(".f-dropdown-wrapper")?.className
      ).toContain("test");
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
    it("when notFoundContent is not empty, click input should show the dropdown", () => {
      const content = <div>Test</div>;
      const { baseElement, getByRole } = render(
        <AutoComplete notFoundContent={content} />
      );

      fireEvent.mouseDown(getByRole("textbox"));
      const wrapper = baseElement.querySelector(".f-dropdown-wrapper");

      expect(wrapper?.children.length).toBe(1);
      expect(wrapper?.children[0]).toBeInstanceOf(HTMLDivElement);
      expect(wrapper?.children[0].innerHTML).toBe("Test");
    });
  });

  describe("prop: open", () => {
    it("when open is true and options is not empty, show the dropdown", () => {
      const { baseElement } = render(
        <AutoComplete open options={mockOptions} />
      );

      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(3);
    });

    it("when open is true and notFoundContent is not empty, show the dropdown", () => {
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

      expect(onSelect).toBeCalledTimes(1);
      expect(onSelect).toBeCalledWith("12345", {
        label: "12345",
        value: "12345",
      });
      expect(onSelect).toReturnWith({
        option: { label: "12345", value: "12345" },
        value: "12345",
      });
    });
  });

  describe("prop: onChange", () => {
    it("input value should call onChange function", () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <AutoComplete options={mockOptions} onChange={onChange} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith("1");
    });

    it("select an option should call onChange function", () => {
      const onChange = jest.fn();
      const { getByRole, baseElement } = render(
        <AutoComplete options={mockOptions} onChange={onChange} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const options = baseElement.querySelectorAll(".f-dropdown-option");
      fireEvent.mouseDown(options[0]);

      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[0][0]).toBe("1");
      expect(onChange.mock.calls[1][0]).toBe("12345");
    });

    it("clear value should call onChange function", () => {
      const onChange = jest.fn();
      const { container, getByRole } = render(
        <AutoComplete onChange={onChange} allowClear options={mockOptions} />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });
      const clearIcon = container.querySelector(".f-autocomplete-clear-icon");
      clearIcon && fireEvent.mouseDown(clearIcon);

      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[0][0]).toBe("1");
      expect(onChange.mock.calls[1][0]).toBe("");
    });
  });

  describe("prop: onDropdownVisibleChange", () => {
    it("visible change show call onDropdownVisibleChange function", () => {
      const onDropdownVisibleChange = jest.fn();
      const { getByRole } = render(
        <AutoComplete
          options={mockOptions}
          onDropdownVisibleChange={onDropdownVisibleChange}
        />
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(onDropdownVisibleChange).toBeCalledTimes(1);
      expect(onDropdownVisibleChange).toBeCalledWith(true);
    });
  });

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

      expect(textarea.className).toContain("f-autocomplete-textarea");
      expect(container.querySelectorAll(".f-dropdown-option").length).toBe(3);
    });

    it("legacy AutoComplete.Option should be compatiable", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete>
          <AutoComplete.Option value="111">111</AutoComplete.Option>
          <AutoComplete.Option value="222">222</AutoComplete.Option>
          <Option value="333">333</Option>
        </AutoComplete>
      );

      fireEvent.input(getByRole("textbox"), { target: { value: "1" } });

      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(3);
    });
  });

  describe("ref", () => {
    it("child.ref instance should support be focused and blurred", () => {
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

    it("call ref.focus should focus input and call ref.blur show blur", () => {
      let inputRef: RefAutoCompleteProps | null = null;
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      render(
        <AutoComplete
          onFocus={onFocus}
          onBlur={onBlur}
          options={[]}
          ref={(node) => {
            inputRef = node;
          }}
        />
      );

      inputRef!.focus();
      inputRef!.blur();

      expect(onFocus).toBeCalledTimes(1);
      expect(onFocus.mock.calls[0][0].nativeEvent).toBeInstanceOf(FocusEvent);
      expect(onBlur).toBeCalledTimes(1);
      expect(onBlur.mock.calls[0][0].nativeEvent).toBeInstanceOf(FocusEvent);
    });
  });

  describe("dropdown", () => {
    it("when options is not empty, click input should show dropdown", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete options={mockOptions} />
      );

      fireEvent.mouseDown(getByRole("textbox"));

      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(3);
    });

    it("delete defaultValue should close dropdown", () => {
      const { getByRole, baseElement } = render(
        <AutoComplete options={mockOptions} defaultValue="2" />
      );

      fireEvent.mouseDown(getByRole("textbox"));
      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(3);
      fireEvent.input(getByRole("textbox"), { target: { value: "" } });
      expect(baseElement.querySelectorAll(".f-dropdown-option").length).toBe(0);
    });
  });
});
