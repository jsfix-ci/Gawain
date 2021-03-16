import React from "react";
import { mount } from "enzyme";

import AutoComplete from "../src";

describe("mount and unmount", () => {
  it(`component could be updated and unmounted without errors`, () => {
    const wrapper = mount(<AutoComplete />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });
});
