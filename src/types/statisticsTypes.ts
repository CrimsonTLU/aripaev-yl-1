export interface DimensionCategory {
  index: { [key: string]: number };
  label: { [key: string]: string };
}

export interface Dimension {
  extension: {
    show: string;
  };
  label: string;
  category: DimensionCategory;
}

export interface Variable {
  code: string;
  text: string;
  values: string[];
  valueTexts: string[];
  elimination?: boolean;
  time?: boolean;
}

export interface VariablesResponse {
  title: string;
  variables: Variable[];
}

export interface SalaryData {
  class: string;
  label: string;
  source: string;
  updated: string;
  id: string[];
  size: number[];
  dimension: { [key: string]: Dimension };
  value: number[];
  role: {
    time: string[];
    [key: string]: string[];
  };
  version: string;
  extension: {
    px: {
      tableid: string;
      decimals: number;
    };
  };
}
