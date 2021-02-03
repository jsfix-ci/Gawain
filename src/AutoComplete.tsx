import React, { useState, useRef } from "react";

import Portal from "./Portal";
import { getPosition } from "./utils";
import Dropdown, { OptionData } from "./Dropdown";

export interface AutoCompleteProps {
  allowClear?: boolean;
  autoFocus?: boolean;

  placeholder?: string;
  options?: OptionData[];
  visible?: boolean;
  children?: React.ReactElement;
  style?: React.CSSProperties;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string | number, option: OptionData) => void;
}

export default function AutoComplete(props: AutoCompleteProps) {
  const {
    allowClear,
    placeholder,
    style,
    options,
    autoFocus,
    value = "",
    onSearch,
    onSelect,
    onChange,
  } = props;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isInputting, setIsInputting] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);

  //  Events
  const onInputInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isInputting) setIsInputting(true);
    if (onSearch) onSearch(e.currentTarget.value);
    if (onChange) onChange(e.currentTarget.value);
    if (!e.currentTarget.value && dropdownVisible) {
      setDropdownVisible(false);
    } else if (e.currentTarget.value && !dropdownVisible) {
      setDropdownVisible(true);
    }
  };

  const onInputFocus = () => {
    if (inputValue || inputRef.current?.value) {
      setDropdownVisible(true);
    }
  };
  const onInputBlur = () => {
    setDropdownVisible(false);
    setIsInputting(false);
  };

  const onInputClick = () => {
    onInputFocus();
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
  const getMyPosition = () => {
    return inputRef.current
      ? getPosition(inputRef.current)
      : { left: 0, top: 0, width: 200 };
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
        point={getMyPosition()}
        onSelect={onSelectOption}
        selectedValue={inputValue}
      />
    );
  };
  const dropdown = dropdownVisible ? (
    <Portal getContainer={getContainer}>{getComponent()}</Portal>
  ) : null;

  const clearIcon =
    allowClear && inputRef.current?.value ? (
      <div className="f-autocomplete-clear-icon" onMouseDown={onClear}>
        <span id="close" />
      </div>
    ) : null;

  return (
    <div style={style}>
      <div className="f-autocomplete-input-wrapper">
        <input
          className="f-autocomplete-input"
          ref={inputRef}
          autoFocus={autoFocus}
          value={isInputting ? undefined : inputValue}
          placeholder={placeholder}
          onMouseDown={onInputClick}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onInput={onInputInput} // onSearch
        />
        {clearIcon}
      </div>
      {dropdown}
    </div>
  );
}
