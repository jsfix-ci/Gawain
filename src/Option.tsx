import * as React from "react";

interface OptionCoreData {
  key?: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  value: string | number;
}
export interface OptionData extends OptionCoreData {
  [index: string]: any;
}

export interface OptionGroup {
  key?: string | number;
  label?: React.ReactNode;
  options: OptionData[];
}

export type OptionsType = (OptionData | OptionGroup)[];

interface OptionProps extends Omit<OptionCoreData, "label"> {
  children: React.ReactNode;
  [prop: string]: any;
}
interface OptionFC extends React.FC<OptionProps> {
  isOption: boolean;
}
export const Option: OptionFC = () => null;
Option.isOption = true;
