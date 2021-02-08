import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import Portal from "./Portal";
import { getPosition, onResize } from "./utils";
import Dropdown, { OptionData } from "./Dropdown";

export interface AutoCompleteProps {
  allowClear?: boolean;
  autoFocus?: boolean;
  children?: React.ReactElement;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;

  placeholder?: string;
  options?: OptionData[];
  visible?: boolean;
  style?: React.CSSProperties;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string | number, option: OptionData) => void;
}

export default function AutoComplete(props: AutoCompleteProps) {
  const {
    allowClear = false,
    autoFocus = false,
    children,
    defaultActiveFirstOption = true,
    defaultOpen,
    placeholder,
    style,
    options = [],
    value = "",
    onSearch,
    onSelect,
    onChange,
  } = props;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isInputting, setIsInputting] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 200 });

  const inputRef = useRef<HTMLInputElement>(null);

  //  Events
  const onInputInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isInputting) {
      setInputValue("");
      setIsInputting(true);
    }
    if (onSearch) onSearch(e.currentTarget.value);
    if (onChange) onChange(e.currentTarget.value);
    if (!e.currentTarget.value && dropdownVisible) {
      setDropdownVisible(false);
    } else if (e.currentTarget.value && !dropdownVisible) {
      setDropdownVisible(true);
    }
  };

  const onInputBlur = () => {
    setDropdownVisible(false);
  };

  const onInputClick = () => {
    if (inputValue || inputRef.current?.value || options.length > 0) {
      setDropdownVisible(true);
    }
  };

  const onSelectOption = (value: string | number, option: OptionData) => {
    setIsInputting(false);
    setDropdownVisible(false);
    setInputValue(value);
    if (onSelect) onSelect(value, option);
    if (onChange) onChange(value);
  };

  const onClear = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
      if (onChange) onChange("");
      setDropdownVisible(false);
      setInputValue("");
    }
  };

  // UI
  useLayoutEffect(() => {
    if (inputNode.type === "textarea")
      onResize("#f-autocomplete", getMyPosition);
  }, []);
  useEffect(() => {
    getMyPosition();
  }, []);

  const getMyPosition = () => {
    inputRef.current
      ? setPosition(getPosition(inputRef.current))
      : setPosition({ left: 0, top: 0, width: 200 });
  };
  const getContainer = () => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    const mountNode = document.body;
    mountNode.appendChild(container);
    return container;
  };
  const getComponent = () => {
    return (
      <Dropdown
        options={options}
        point={position}
        onSelect={onSelectOption}
        selectedValue={inputValue}
        defaultActiveFirstOption={defaultActiveFirstOption}
      />
    );
  };

  const forceOpen = defaultOpen && options.length > 0;

  const dropdown =
    dropdownVisible || forceOpen ? (
      <Portal getContainer={getContainer}>{getComponent()}</Portal>
    ) : null;

  const clearIcon =
    allowClear && inputRef.current?.value ? (
      <div className="f-autocomplete-clear-icon" onMouseDown={onClear}>
        <span id="close" />
      </div>
    ) : null;

  let inputNode = children || <input />;
  inputNode = React.cloneElement(inputNode, {
    id: "f-autocomplete",
    autoComplete: "off",
    className: `f-autocomplete-${inputNode.type}`,
    ref: inputRef,
    autoFocus,
    value: isInputting ? undefined : inputValue,
    placeholder,
    onMouseDown: onInputClick,
    onBlur: onInputBlur,
    onInput: onInputInput,
  });

  return (
    <div style={style}>
      <div className="f-autocomplete-input-wrapper">
        {inputNode}
        {clearIcon}
      </div>
      {dropdown}
    </div>
  );
}
