import React, { useState } from "react";

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
export const basicUsage = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText
        ? []
        : [
            mockVal(searchText),
            mockVal(searchText, 2),
            mockVal(searchText, 3),
            mockVal(searchText, 4),
            mockVal(searchText, 5),
            mockVal(searchText, 6),
          ]
    );
  };

  return (
    <div>
      <AutoComplete
        placeholder="input here"
        options={options}
        onSearch={onSearch}
        style={{ width: 200 }}
      />
      <br />
      <br />
      <AutoComplete
        placeholder="control mode"
        options={options}
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  );
};

basicUsage.storyName = "基本使用";
basicUsage.parameters = {
  viewMode: "story",
  docs: { disable: true, hide: true },
  controls: { hideNoControlsWarning: true },
};
