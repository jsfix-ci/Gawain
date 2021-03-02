import React, { useRef } from "react";
import classNames from "classnames";

import { OptionData } from "./Option";

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

  const hasSelected = !!sValue;
  const renderOptions = (options: OptionData[]) => {
    return options.map((o, index) => {
      const optionClassName = classNames("f-dropdown-option", {
        "f-dropdown-option-disabled": !!o.disabled,
        "f-dropdown-option-selected": hasSelected
          ? sValue === o.value
          : !hasInitOption.current && defaultActiveFirstOption && index === 0
          ? true
          : false,
      });
      return (
        <div
          className={optionClassName}
          key={o.key || o.value}
          onMouseDown={(e) => onClickOption(e, o.value, o)}
        >
          {o.label || o.value}
        </div>
      );
    });
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
      {options.length === 0 ? notFoundContent : renderOptions(options)}
    </div>
  ) : null;
}
