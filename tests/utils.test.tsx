import React from "react";

import AutoComplete from "../src";
import { convertChildrenToOption } from "../src/utils";

const { Option } = AutoComplete;

describe("Utils", () => {
  it("convertChildrenToOption", () => {
    const node = (
      <AutoComplete>
        <Option key="1" value="1">
          test
        </Option>
        null
        <span>Not good</span>
      </AutoComplete>
    );

    expect(convertChildrenToOption(node.props.children)).toEqual([
      {
        key: "1",
        children: "test",
        value: "1",
      },
    ]);
  });
});
