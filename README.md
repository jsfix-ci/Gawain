## cc-autocomplete

## API

| name                        | description                                                                                          | type                                                                          | default             | done |
| --------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------- | ---- |
| allowClear                  | 支持清除                                                                                             | boolean                                                                       | false               | ✔    |
| autoFocus                   | 自动获取焦点                                                                                         | boolean                                                                       | false               | ✔    |
| backfill                    | 使用键盘选择选项的时候把选中项回填到输入框中                                                         | boolean                                                                       | false               | ❌   |
| children (自动完成的数据源) | 自动完成的数据源                                                                                     | React.ReactElement\<OptionProps\> \| Array<React.ReactElement\<OptionProps\>> | -                   | ❌   |
| children (自定义输入框)     | 自定义输入框                                                                                         | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement\<InputProps\>   | \<input />          | ✔    |
| defaultActiveFirstOption    | 是否默认高亮第一个选项                                                                               | boolean                                                                       | true                | ✔    |
| defaultOpen                 | 是否默认展开下拉菜单                                                                                 | boolean                                                                       | -                   | ✔    |
| defaultValue                | 指定默认选中的条目                                                                                   | string                                                                        | -                   | ✔    |
| disabled                    | 是否禁用                                                                                             | boolean                                                                       | false               | ✔    |
| dropdownClassName           | 下拉菜单的 className 属性                                                                            | string                                                                        | -                   | ✔    |
| dropdownMatchSelectWidth    | 下拉菜单和选择器同宽。                                                                               | boolean \| number                                                             | true                | ✔    |
| filterOption                | 接收 inputValue option 两个参数,当 option 符合筛选条件时，应返回 true，反之则应返回 false            | function(inputValue, option)                                                  | -                   | ✔    |
| getPopupContainer           | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | function(triggerNode)                                                         | () => document.body | ✔    |
| notFoundContent             | 当下拉列表为空时显示的内容                                                                           | ReactNode                                                                     | -                   | ✔    |
| open                        | 是否展开下拉菜单                                                                                     | boolean                                                                       | -                   | ✔    |
| options                     | 数据化配置选项内容                                                                                   | { label, value }[]                                                            | -                   | ✔    |
| placeholder                 | 输入框提示                                                                                           | string                                                                        | -                   | ✔    |
| value                       | 指定当前选中的条目                                                                                   | string                                                                        | -                   | ✔    |
| onBlur                      | 失去焦点时的回调                                                                                     | function(event)                                                               | -                   | ✔    |
| onChange                    | 选中 option，或 input 的 value 变化时，调用此函数                                                    | (value:string) => void                                                        | -                   | ✔    |
| onDropdownVisibleChange     | 展开下拉菜单的回调                                                                                   | function(open)                                                                | -                   | ✔    |
| onFocus                     | 获得焦点时的回调                                                                                     | function(event)                                                               | -                   | ✔    |
| onSearch                    | 搜索补全项的时候调用                                                                                 | (value:string) => void                                                        | -                   | ✔    |
| onSelect                    | 被选中时调用，参数为选中项的 value 值                                                                | function(value, option)                                                       | -                   | ✔    |

## TODO

1. 补充 Rx 代码的测试
