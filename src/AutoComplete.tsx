import classNames from "classnames";
import React, { useState, useRef, useEffect, useMemo } from "react";

import Portal from "./Portal";
import Dropdown from "./Dropdown";
import useSingleton from "./hooks/useSingleton";
import { OptionData, OptionsType } from "./Option";
import {
  getPosition,
  onResize,
  returnDocument,
  contains,
  isInvalidChild,
  convertChildrenToOption,
  getUUID,
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
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  notFoundContent?: React.ReactNode;
  open?: boolean;
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
    getPopupContainer,
    notFoundContent,
    open = false,
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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>();
  const hasInit = useRef(false);
  const id = useRef<number>();

  const [dropdownVisible, setDropdownVisible] = useState(defaultOpen);
  const [position, setPosition] = useState({
    left: 0,
    top: -99999,
    width: 200,
  });
  const [displayValue, setDisplayValue] = useState("");

  useSingleton(() => {
    id.current = getUUID();
  });

  // 只能在mounted后调用的方法中使用
  const getNodes = () => {
    let inputNode: HTMLElement;
    if (
      inputRef.current instanceof HTMLTextAreaElement ||
      inputRef.current instanceof HTMLInputElement
    ) {
      inputNode = inputRef.current;
    } else {
      inputNode = wrapperRef.current?.querySelector(
        `#f-autocomplete-${id.current}`
      ) as HTMLElement;
    }
    const mountNode = getPopupContainer
      ? getPopupContainer(inputNode)
      : document.body;
    return [inputNode, mountNode];
  };

  const getDropdownPosition = () => {
    const [inputNode, mountNode] = getNodes();
    if (inputNode) {
      setPosition(getPosition(inputNode, mountNode));
    }
  };

  //  Events Listeners
  // 可能和onblur 重复
  const onDocumentMousedown = (event: MouseEvent) => {
    const { target } = event;
    const [inputNode] = getNodes();
    if (
      target instanceof Node &&
      !contains(inputNode, target) &&
      dropdownVisible
    ) {
      setDropdownVisible(false);
    }
  };

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
      options.length > 0 ||
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
  };

  // UI
  const mergedVisible = useMemo(() => {
    if (open && options.length > 0) {
      return true;
    } else {
      return dropdownVisible;
    }
  }, [open, dropdownVisible, options]);

  useEffect(() => {
    // 如果加上mergedVisible为true再进行计算，会有错位问题，寻找原因
    getDropdownPosition();
  }, []);

  useEffect(() => {
    const currentDocument = returnDocument(wrapperRef.current);
    currentDocument.addEventListener("mousedown", onDocumentMousedown);
    hasInit.current = true;
    return () =>
      currentDocument.removeEventListener("mousedown", onDocumentMousedown);
  }, []);

  useEffect(() => {
    const [inputNode] = getNodes();
    if (inputNode instanceof HTMLTextAreaElement) {
      onResize(inputNode, getDropdownPosition);
    }
  }, []);

  useEffect(() => {
    if (onDropdownVisibleChange && hasInit.current) {
      onDropdownVisibleChange(dropdownVisible);
    }
  }, [dropdownVisible, onDropdownVisibleChange]);

  const getContainer = () => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    const [, mountNode] = getNodes();
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

  const dropdown = mergedVisible ? (
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
  const inputNodeClassName = classNames("f-autocomplete", {
    [`f-autocomplete-${displayInputNode.type}`]: Boolean(displayInputNode.type),
  });

  displayInputNode = React.cloneElement(displayInputNode, {
    autoComplete: "off",
    className: inputNodeClassName,
    id: `f-autocomplete-${id.current}`,
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
