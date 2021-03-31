/* eslint-disable no-console */
import React, { useState } from "react";

import AutoComplete from "../src";
import { convertChildrenToOption } from "../src/utils";

export default {
  title: "AutoComplete",
  component: AutoComplete,
};

const { Option } = AutoComplete;

export function Site19() {
  const node = (
    <AutoComplete>
      <Option key="1" value="1">
        test
      </Option>
      null
      <span>Not good</span>
    </AutoComplete>
  );
  console.log(convertChildrenToOption(node.props.children));
  console.log(
    convertChildrenToOption(
      <Option key="1" value="1">
        test
      </Option>
    )
  );

  return (
    <div>
      <br />
    </div>
  );
}

Site19.storyName = "Site19";
Site19.parameters = {
  controls: { hideNoControlsWarning: true },
};
