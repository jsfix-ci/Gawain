/* eslint-disable no-console */
import React, { useState } from "react";

import "../assets/index.less";
import AutoComplete from "../src";

export default {
  title: "AutoComplete",
  component: AutoComplete,
};

export const RxjsDemo = () => {
  const [options, setOptions] = useState([]);

  const onRemoteFetch = (res) => {
    setOptions(res[0].lists.map((v) => ({ label: v, value: v })));
  };

  return (
    <div>
      <p>
        前置准备
        <br />
        `npm run rx:mock`
      </p>
      <p>
        行为表现
        <br />
        1.用户停止输入 500ms 后，再发送请求；
        <br />
        2.如果请求没有返回时，用户就再次输入，要取消之前的请求；
        <br />
        3.不能因为搜索而影响用户正常输入新的字符；
        <br />
        4.如果用户输入超过5个字符，取消所有请求，并显示提示：您输入的字符数过多。
      </p>

      <AutoComplete
        style={{ width: 400 }}
        placeholder="input a letter to get city list"
        rx={true}
        options={options}
        onRemoteFetch={onRemoteFetch}
      />
    </div>
  );
};

RxjsDemo.storyName = "RxjsDemo";
RxjsDemo.parameters = {
  controls: { hideNoControlsWarning: true },
};
