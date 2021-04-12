import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import AutoComplete, { OptionData } from "../src";

export default {
  title: "AutoComplete",
  component: AutoComplete,
};

function getRandomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

export const UnCertainCategory = () => {
  const [options, setOptions] = useState<OptionData[]>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    action("onSelect")(value);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <input placeholder="input here" />
    </AutoComplete>
  );
};

UnCertainCategory.storyName = "查询模式-不确定类目";
UnCertainCategory.parameters = {
  controls: { hideNoControlsWarning: true },
};
