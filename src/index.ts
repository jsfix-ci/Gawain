import { Option, OptionData } from "./Option";
import Dropdown, { DropdownProps } from "./Dropdown";
import AutoComplete, {
  AutoCompleteProps,
  RefAutoCompleteProps,
} from "./AutoComplete";

export { Dropdown, Option }; // components
export { AutoCompleteProps, OptionData, DropdownProps, RefAutoCompleteProps }; // types

type RefAutoCompleteWithOption = typeof AutoComplete & {
  Option: typeof Option;
};

(AutoComplete as RefAutoCompleteWithOption).Option = Option;

export default AutoComplete as RefAutoCompleteWithOption;
