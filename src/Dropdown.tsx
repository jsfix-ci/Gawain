import React, { useState } from "react";
import classNames from "classnames";

export interface OptionData {
  key?: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  value: string | number;
}
export interface DropdownProps {
  options?: OptionData[];
  notFoundContent?: React.ReactNode;
  point: { top: number; left: number; width: number };
  onSelect: (selectedValue: number | string) => void;
  selectedValue?: number | string;
}

export default function Dropdown(props: DropdownProps) {
  const {
    options,
    notFoundContent,
    point,
    onSelect,
    selectedValue: sValue = "",
  } = props;

  const [selectedValue, setSelectedValue] = useState<number | string>(sValue);

  // if (options.length === 0) {
  //   return <div>{notFoundContent}</div>;
  // }

  const onClickOption = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: number | string
  ) => {
    e.preventDefault();
    setSelectedValue(value);
    onSelect(value);
  };

  const renderOptions = (options: OptionData[]) => {
    return options.map((o) => {
      const optionClassName = classNames("f-dropdown-option", {
        "f-dropdown-option-disabled": !!o.disabled,
        "f-dropdown-option-selected": selectedValue === o.value,
      });
      return (
        <div
          className={optionClassName}
          key={o.key || o.value}
          onMouseDown={(e) => onClickOption(e, o.value)}
        >
          {o.label || o.value}
        </div>
      );
    });
  };

  const style: React.CSSProperties = {
    ...point,
    position: "absolute",
  };

  return (
    <div className="f-dropdown-wrapper" style={style}>
      {renderOptions(options || [])}
    </div>
  );
}
