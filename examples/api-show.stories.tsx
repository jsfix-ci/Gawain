/* eslint-disable no-console */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import "./demo.less";
import "../src/assets/index.less";
import AutoComplete from "../src";

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
        <label>dropdownMatchSelectWidth:false</label>
        <AutoComplete
          dropdownMatchSelectWidth={false}
          options={options}
          style={{ width: 100 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
        <label>dropdownMatchSelectWidth:200</label>
        <AutoComplete
          dropdownMatchSelectWidth={200}
          options={options}
          style={{ width: 100 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
      <br />
      <div>
        <label>notFoundContent:我没有数据</label>
        <AutoComplete
          notFoundContent={
            <div>
              <p>我没有数据</p>
              <p>但是我要展示</p>
            </div>
          }
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
          options={[
            { label: 1, value: 1 },
            { label: 2, value: 2 },
          ]}
          style={{ width: 200 }}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="input here"
        />
      </div>
      <br />
    </div>
  );
}

APIShow.storyName = "部分API展示";
APIShow.parameters = {
  controls: { hideNoControlsWarning: true },
};
