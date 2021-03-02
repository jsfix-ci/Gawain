/* eslint-disable no-console */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import "../src/assets/index.less";
import AutoComplete, { Option } from "../src";

export default {
  title: "AutoComplete",
  component: AutoComplete,
};

export const CustomOption = () => {
  const [result, setResult] = useState<string[]>([]);
  const handleSearch = (value: string) => {
    let res: string[] = [];
    if (!value || value.indexOf("@") >= 0) {
      res = [];
    } else {
      res = ["gmail.com", "163.com", "qq.com"].map(
        (domain) => `${value}@${domain}`
      );
    }
    setResult(res);
  };
  return (
    <div>
      <AutoComplete
        style={{ width: 200 }}
        onSearch={handleSearch}
        placeholder="input here"
      >
        {result.map((email: string) => (
          <Option key={email} value={email}>
            {email}
          </Option>
        ))}
      </AutoComplete>
      <br />
      <AutoComplete
        style={{ width: 200 }}
        onSearch={handleSearch}
        placeholder="input here"
      >
        <Option key={result[0]} value={result[0]}>
          {result[0]}
        </Option>
      </AutoComplete>
    </div>
  );
};

CustomOption.storyName = "自定义选项";
CustomOption.parameters = {
  controls: { hideNoControlsWarning: true },
};
