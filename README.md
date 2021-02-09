## AutoComplete

参考 Antd 中的 AutoComplete

LeetCode Hire 中的题 4 与题 5

## API

| name                        | description                                       | type                                                                      | default    | done |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- | ---------- | ---- |
| allowClear                  | 支持清除                                          | boolean                                                                   | false      | ✔    |
| autoFocus                   | 自动获取焦点                                      | boolean                                                                   | false      | ✔    |
| backfill                    | 使用键盘选择选项的时候把选中项回填到输入框中      | boolean                                                                   | false      | ❌   |
| children (自动完成的数据源) | 自动完成的数据源                                  | React.ReactElement<OptionProps> \| Array<React.ReactElement<OptionProps>> | -          | ❌   |
| children (自定义输入框)     | 自定义输入框                                      | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement<InputProps> | \<input /> | ✔    |
| defaultActiveFirstOption    | 是否默认高亮第一个选项                            | boolean                                                                   | true       | ✔    |
| defaultOpen                 | 是否默认展开下拉菜单                              | boolean                                                                   | -          | ✔    |
| defaultValue                | 指定默认选中的条目                                | string                                                                    | -          | ✔    |
| onChange                    | 选中 option，或 input 的 value 变化时，调用此函数 | (value:string) => void                                                    | -          | ✔    |
| onSearch                    | 搜索补全项的时候调用                              | (value:string) => void                                                    | -          | ✔    |
