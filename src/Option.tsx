import * as React from "react";

export interface OptionData {
  key?: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  value: string | number;
}

interface OptionProps extends Omit<OptionData, "label"> {
  children: React.ReactNode;
  [prop: string]: any;
}
interface OptionFC extends React.FC<OptionProps> {
  isOption: boolean;
}
export const Option: OptionFC = () => null;
Option.isOption = true;
