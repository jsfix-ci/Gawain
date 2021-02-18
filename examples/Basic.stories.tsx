/* eslint-disable no-console */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import "../src/assets/index.less";
import AutoComplete, { OptionData } from "../src";

// This default export determines where your story goes in the story list
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
    console.log("onSelect", data);
  };

  const onChange = (data: string | number) => {
    action("onChange")(data);
    setValue(data);
  };

  const test = (a: string | number, b: OptionData) => {
    return false;
  };

  return (
    <div>
      <AutoComplete
        filterOption={test}
        options={options}
        style={{ width: 200 }}
        onSearch={onSearch}
        onSelect={onSelect}
        placeholder="input here"
      />
      <br />
      <br />
      <AutoComplete
        value={value}
        options={options}
        style={{ width: 200 }}
        onSearch={onSearch}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="control mode"
      />
    </div>
  );
}

Basic.storyName = "基本使用";
Basic.parameters = {
  controls: { hideNoControlsWarning: true },
};
