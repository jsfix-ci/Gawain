import React, { useState, useRef, useEffect, useMemo } from "react";

import Portal from "./Portal";
import Dropdown from "./Dropdown";
import { OptionData, OptionsType } from "./Option";
import {
  getPosition,
  onResize,
  returnDocument,
  contains,
  isInvalidChild,
  convertChildrenToOption,
} from "./utils";

export interface AutoCompleteProps {
  allowClear?: boolean;
  autoFocus?: boolean;
  children?: React.ReactNode;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean | number;
  filterOption?: (inputValue: string, option: OptionData) => boolean;
  getPopupContainer?: () => React.ReactNode;
  notFoundContent?: React.ReactNode;
  options?: OptionsType;
  placeholder?: string;
  value?: string | number;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  onChange?: (value: string | number) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: OptionData) => void;
  style?: React.CSSProperties;
  visible?: boolean;
}

export default function AutoComplete(props: AutoCompleteProps) {
  const {
    allowClear = false,
    autoFocus = false,
    children,
    defaultActiveFirstOption = true,
    defaultOpen = false,
    defaultValue,
    disabled = false,
    dropdownClassName,
    dropdownMatchSelectWidth = true,
    filterOption,
    notFoundContent,
    options = [],
    placeholder,
    onBlur,
    onDropdownVisibleChange,
    onFocus,
    onSearch,
    onSelect,
    onChange,
    style,
    value,
  } = props;

  const [dropdownVisible, setDropdownVisible] = useState(defaultOpen);
  const [position, setPosition] = useState({
    left: 0,
    top: -99999,
    width: 200,
  });
  const [displayValue, setDisplayValue] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>();
  const optionRef = useRef(options);
  const hasInit = useRef(false);

  // Common
  // 需要在挂载后使用
  const getInputNode = () => {
    if (
      inputRef.current instanceof HTMLTextAreaElement ||
      inputRef.current instanceof HTMLInputElement
    ) {
      return inputRef.current;
    }
    return wrapperRef.current?.querySelector("#f-autocomplete") as Element;
  };

  //  Events
  const onInputInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (onSearch) onSearch(value);
    if (onChange) onChange(value);
    setDisplayValue(value);
    if (!value && dropdownVisible) {
      setDropdownVisible(false);
    } else if (value && !dropdownVisible) {
      setDropdownVisible(true);
    }
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDropdownVisible(false);
    if (onBlur) onBlur(e);
  };
  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(e);
  };

  const onInputClick = () => {
    if (
      displayValue ||
      optionRef.current.length > 0 ||
      typeof notFoundContent !== "undefined"
    ) {
      setDropdownVisible(true);
    }
  };

  const onSelectOption = (value: string | number, option: OptionData) => {
    setDisplayValue(String(value));
    if (onSelect) onSelect(String(value), option);
    if (onChange) onChange(value);
    setDropdownVisible(false);
  };

  const onClear = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDisplayValue("");
    if (onChange) onChange("");
    setDropdownVisible(false);
    optionRef.current = [];
  };

  // 可能和onblur 重复
  const onDocumentMousedown = (event: MouseEvent) => {
    const { target } = event;
    const inputNode = getInputNode();
    if (
      target instanceof Node &&
      !contains(inputNode, target) &&
      dropdownVisible
    ) {
      setDropdownVisible(false);
    }
  };

  // UI
  useEffect(() => {
    const inputNode = getInputNode();
    if (inputNode instanceof HTMLTextAreaElement) {
      onResize(inputNode, getMyPosition);
    }
  }, []);
  useEffect(() => {
    dropdownVisible && getMyPosition();
    if (onDropdownVisibleChange && hasInit.current)
      onDropdownVisibleChange(dropdownVisible);
  }, [dropdownVisible]);

  useEffect(() => {
    const currentDocument = returnDocument(wrapperRef.current);
    currentDocument.addEventListener("mousedown", onDocumentMousedown);
    hasInit.current = true;
    return () =>
      currentDocument.removeEventListener("mousedown", onDocumentMousedown);
  }, []);

  const getMyPosition = () => {
    const inputNode = getInputNode();
    inputNode
      ? setPosition(getPosition(inputNode))
      : setPosition({ left: 0, top: -100, width: 200 });
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

  const displayOptions = useMemo(() => {
    const childNodes = convertChildrenToOption(children);
    const data = childNodes.length > 0 ? childNodes : options;
    return typeof filterOption !== "undefined"
      ? data.filter((o) => filterOption(displayValue, o))
      : data;
  }, [options, children, displayValue]);

  const getComponent = () => {
    return (
      <Dropdown
        defaultActiveFirstOption={defaultActiveFirstOption}
        dropdownClassName={dropdownClassName}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        notFoundContent={notFoundContent}
        options={displayOptions}
        onSelect={onSelectOption}
        point={position}
        selectedValue={displayValue}
      />
    );
  };

  const dropdown = dropdownVisible ? (
    <Portal getContainer={getContainer}>{getComponent()}</Portal>
  ) : null;

  const clearIcon =
    allowClear && displayValue ? (
      <div className="f-autocomplete-clear-icon" onMouseDown={onClear}>
        <span id="close" />
      </div>
    ) : null;

  let displayInputNode = isInvalidChild(children) ? (
    <input />
  ) : (
    (children as React.ReactElement)
  );

  const isControlMode = !(typeof value === "undefined");

  // type need fix
  // id need fix
  displayInputNode = React.cloneElement(displayInputNode, {
    autoComplete: "off",
    className: `f-autocomplete-${displayInputNode.type}`,
    id: "f-autocomplete",
    ref: inputRef,
    autoFocus,
    defaultValue: defaultValue,
    value: isControlMode ? value : displayValue,
    disabled,
    placeholder,
    onMouseDown: onInputClick,
    onBlur: onInputBlur,
    onInput: onInputInput,
    onFocus: onInputFocus,
  });

  return (
    <div style={style}>
      <div className="f-autocomplete-input-wrapper" ref={wrapperRef}>
        {displayInputNode}
        {clearIcon}
      </div>
      {dropdown}
    </div>
  );
}
