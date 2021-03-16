import React from "react";
import { mount } from "enzyme";

import AutoComplete from "../src";

describe("AutoComplete", () => {
  describe("AutoComplete.render", () => {
    test("AutoComplete with custom Input render perfectly", () => {
      const options = [
        { label: "12345", value: "12345" },
        { label: "23456", value: "23456" },
        { label: "34567", value: "34567" },
      ];
      const wrapper = mount(
        <AutoComplete options={options}>
          <textarea />
        </AutoComplete>
      );
      const textArea = wrapper.find("textarea");

      textArea.simulate("change", { target: { value: "123" } });

      expect(textArea.length).toBe(1);
      // expect(wrapper.find("document").find(".f-dropdown-option").length).toBe(
      //   3
      // );
    });
  });
});
