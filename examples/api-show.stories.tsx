/* eslint-disable no-console */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import "../src/assets/index.less";
import AutoComplete from "../src";

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

export function APIShow() {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [value, setValue] = useState<number | string>("");

  const onSearch = (searchText: string) => {
    action("onSearch")(searchText);
    setOptions(
      !searchText
        ? []
        : [
            mockVal(searchText),
            mockVal(searchText, 2),
            mockVal(searchText, 3),
            mockVal(searchText, 4),
            mockVal(searchText, 5),
          ]
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

  return (
    <div>
      <div>
        <label>allowClear</label>
        <AutoComplete
          allowClear
          options={options}
          style={{ width: 200 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
      <br />
      <div>
        <label>autoFocus</label>
        <AutoComplete
          autoFocus
          options={[{ label: 1, value: 1 }]}
          style={{ width: 200 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
      <br />
      <div>
        <label>defaultActiveFirstOption:false</label>
        <AutoComplete
          defaultActiveFirstOption={false}
          options={options}
          style={{ width: 200 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
      <br />
      <div>
        <label>defaultOpen:true</label>
        <AutoComplete
          defaultOpen
          options={[{ label: 1, value: 1 }]}
          style={{ width: 200 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
      <br />
      <br />
      <br />
      <div>
        <label>defaultOpen:true</label>
        <AutoComplete
          defaultOpen
          options={[{ label: 1, value: 1 }]}
          style={{ width: 200 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
    </div>
  );
}

APIShow.storyName = "部分API展示";
APIShow.parameters = {
  controls: { hideNoControlsWarning: true },
};
