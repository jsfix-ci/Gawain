/* eslint-disable no-console */
import React from "react";

import "../assets/index.less";
import AutoComplete, { OptionData } from "../src";

export default {
  title: "AutoComplete",
  component: AutoComplete,
};

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

export const NonCaseSensitive = () => {
  const filterOption = (inputValue: string, option: OptionData) => {
    return (
      String(option.value).toUpperCase().indexOf(inputValue.toUpperCase()) !==
      -1
    );
  };

  return (
    <AutoComplete
      style={{ width: 200 }}
      options={options}
      placeholder="try to type `b`"
      filterOption={filterOption}
    />
  );
};

NonCaseSensitive.storyName = "不区分大小写";
NonCaseSensitive.parameters = {
  controls: { hideNoControlsWarning: true },
};
