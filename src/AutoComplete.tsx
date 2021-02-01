import React, { useState, useRef } from "react";

import Portal from "./Portal";
import { getPosition } from "./utils";
import Dropdown, { OptionData } from "./Dropdown";

export interface AutoCompleteProps {
  placeholder?: string;
  options?: OptionData[];
  onSearch?: (searchText: string) => void;
  visible?: boolean;
  children?: React.ReactElement;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

export default function AutoComplete(props: AutoCompleteProps) {
  const { placeholder, style, options, onSearch, autoFocus } = props;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isInputting, setIsInputting] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const getMyPosition = () => {
    return inputRef.current
      ? getPosition(inputRef.current)
      : { left: 0, top: 0, width: 200 };
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInputting) {
      setIsInputting(true);
    }
    if (onSearch) {
      onSearch(e.target.value);
    }

    if (!e.target.value && dropdownVisible) {
      setDropdownVisible(false);
    } else if (e.target.value && !dropdownVisible) {
      setDropdownVisible(true);
    }
  };
  const onInputFocus = () => {
    if (selectedValue || inputRef.current?.value) {
      setDropdownVisible(true);
    }
  };
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setDropdownVisible(false);
  };

  const onSelectValue = (value: string | number) => {
    setIsInputting(false);
    setDropdownVisible(false);
    setSelectedValue(String(value));
  };

  const getComponent = () => {
    return (
      <Dropdown
        options={options}
        point={getMyPosition()}
        onSelect={onSelectValue}
        selectedValue={selectedValue}
      />
    );
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

  const dropdown = dropdownVisible ? (
    <Portal getContainer={getContainer}>{getComponent()}</Portal>
  ) : null;

  return (
    <div style={style}>
      <input
        autoFocus={autoFocus}
        className="f-autocomplete-input"
        ref={inputRef}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onInputChange}
        value={isInputting ? undefined : selectedValue}
        placeholder={placeholder}
      />
      {dropdown}
    </div>
  );
}
