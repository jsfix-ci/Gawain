import React, { useState, useRef } from "react";

import Portal from "./Portal";
import { getPosition } from "./utils";
import Dropdown, { OptionData } from "./Dropdown";

export interface AutoCompleteProps {
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
  const [selectedValue, setSelectedValue] = useState(value);

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

    if (!e.target.value && dropdownVisible) {
      setDropdownVisible(false);
    } else if (e.target.value && !dropdownVisible) {
      setDropdownVisible(true);
    }

    if (onChange) {
      onChange(e.currentTarget.value);
    }
  };

  const onInputFocus = () => {
    if (selectedValue || inputRef.current?.value) {
      setDropdownVisible(true);
    }
  };
  const onInputBlur = () => {
    setDropdownVisible(false);
  };
  const onInputInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.currentTarget.value);
    }
  };

  const onSelectOption = (value: string | number, option: OptionData) => {
    setIsInputting(false);
    setDropdownVisible(false);
    setSelectedValue(String(value));
    if (onSelect) {
      onSelect(value, option);
    }
    if (onChange) {
      onChange(value);
    }
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
        selectedValue={selectedValue}
      />
    );
  };
  const dropdown = dropdownVisible ? (
    <Portal getContainer={getContainer}>{getComponent()}</Portal>
  ) : null;

  const isControlMode = !!value;

  return (
    <div style={style}>
      <input
        className="f-autocomplete-input"
        ref={inputRef}
        autoFocus={autoFocus}
        value={isInputting ? undefined : selectedValue}
        placeholder={placeholder}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onInputChange}
        onInput={onInputInput} // onSearch
      />
      {dropdown}
    </div>
  );
}
