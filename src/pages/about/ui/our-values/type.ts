export type ValueItem = {
  id: number;
  title: string;
  text: string;
};

export type ValuesData = {
  title: string;
  items: ValueItem[];
};

export interface IOurValuesProps {
  data: ValuesData;
}
