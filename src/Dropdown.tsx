import React, { useRef } from "react";
import classNames from "classnames";

import { OptionData, OptionsType } from "./Option";

export interface DropdownProps {
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean | number;
  notFoundContent?: React.ReactNode;
  onSelect: (value: string | number, option: OptionData) => void;
  options?: OptionData[];
  point: { top: number; left: number; width: number };
  selectedValue?: number | string;
}

export default function Dropdown(props: DropdownProps) {
  const {
    defaultActiveFirstOption = true,
    dropdownClassName,
    dropdownMatchSelectWidth,
    notFoundContent,
    onSelect,
    options = [],
    point,
    selectedValue: sValue = "",
  } = props;

  const hasInitOption = useRef<undefined | boolean>(undefined);
  if (typeof hasInitOption.current !== "boolean") {
    hasInitOption.current = options?.length > 0;
  }

  const onClickOption = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string | number,
    option: OptionData
  ) => {
    e.preventDefault();
    onSelect(value, option);
  };

  const renderData = (data: OptionsType) => {
    return data.map((d, index) => {
      const isGroup = Array.isArray(d.options);
      return isGroup ? (
        <div>
          <span onMouseDown={(e) => e.preventDefault()}>{d.label}</span>
          {renderData(d.options)}
        </div>
      ) : (
        renderOptions(d as OptionData, index)
      );
    });
  };

  const hasSelected = !!sValue;
  const renderOptions = (option: OptionData, index: number) => {
    const optionClassName = classNames("f-dropdown-option", {
      "f-dropdown-option-disabled": !!option.disabled,
      "f-dropdown-option-selected": hasSelected
        ? sValue === option.value
        : !hasInitOption.current && defaultActiveFirstOption && index === 0
        ? true
        : false,
    });
    return (
      <div
        className={optionClassName}
        key={option.key || option.value}
        onMouseDown={(e) => onClickOption(e, option.value, option)}
      >
        {option.label || option.value}
      </div>
    );
  };

  const isValidNumber =
    typeof dropdownMatchSelectWidth === "number" &&
    dropdownMatchSelectWidth > point.width;

  const style: React.CSSProperties = {
    ...point,
    position: "absolute",
    ...((isValidNumber || !dropdownMatchSelectWidth) && {
      width: isValidNumber ? (dropdownMatchSelectWidth as number) : "auto",
    }),
  };

  const _dropdownClassName = classNames(
    "f-dropdown-wrapper",
    dropdownClassName
  );

  const needRender =
    options.length > 0 || typeof notFoundContent !== "undefined";
  return needRender ? (
    <div className={_dropdownClassName} style={style}>
      {options.length === 0 ? notFoundContent : renderData(options)}
    </div>
  ) : null;
}
