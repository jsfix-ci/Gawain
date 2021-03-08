import * as React from "react";

export interface OptionData {
  key?: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  value: string | number;
  [index: string]: any;
}

export interface OptionGroup {
  key?: string | number;
  label?: React.ReactNode;
  options: OptionData[];
}

export type OptionsType = (OptionData | OptionGroup)[];

interface OptionProps extends Omit<OptionData, "label"> {
  children: React.ReactNode;
  [prop: string]: any;
}
interface OptionFC extends React.FC<OptionProps> {
  isOption: boolean;
}
export const Option: OptionFC = () => null;
Option.isOption = true;
