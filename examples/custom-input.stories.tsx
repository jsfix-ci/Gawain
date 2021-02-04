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

export const Custom = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const handleSearch = (value: string) => {
    action("onSearch")(value);
    setOptions(
      !value
        ? []
        : [
            { value },
            { value: value + value },
            { value: value + value + value },
          ]
    );
  };

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log("handleKeyPress", ev);
  };

  const onSelect = (value: string | number) => {
    action("onSelect")(value);
    console.log("onSelect", value);
  };

  return (
    <div>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <textarea
          placeholder="input here"
          className="custom"
          style={{ height: 50 }}
          onKeyPress={handleKeyPress}
        />
      </AutoComplete>
    </div>
  );
};

Custom.storyName = "自定义输入组件";
Custom.parameters = {
  controls: { hideNoControlsWarning: true },
};
