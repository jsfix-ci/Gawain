/* eslint-disable no-console */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import AutoComplete from "../src";
import "../src/assets/index.less";

export default {
  title: "AutoComplete",
  component: AutoComplete,
};

const mockVal = (str: string, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

export function Basic() {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState<number | string>("");

  const onSearch = (searchText: string) => {
    action("onSearch")(searchText);
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data: string | number) => {
    action("onSelect")(data);
  };

  const onChange = (data: string | number) => {
    action("onChange")(data);
    setValue(data);
  };

  const onBlur = (e: React.FocusEvent) => {
    action("onBlur")(e);
  };
  const onFocus = (e: React.FocusEvent) => {
    action("onFocus")(e);
  };

  const onDropdownVisibleChange = (open: boolean) => {
    console.log(open);
  };

  return (
    <div>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSearch={onSearch}
        onBlur={onBlur}
        onSelect={onSelect}
        placeholder="input here"
      />
      <br />
      <br />
      <AutoComplete
        onFocus={onFocus}
        value={value}
        options={options}
        style={{ width: 200 }}
        onSearch={onSearch}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="control mode"
        onDropdownVisibleChange={onDropdownVisibleChange}
      />
    </div>
  );
}

Basic.storyName = "基本使用";
Basic.parameters = {
  controls: { hideNoControlsWarning: true },
};
