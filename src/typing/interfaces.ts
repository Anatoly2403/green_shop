export interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  categories: string;
  size: string;
  image: string;
  newArrivals: boolean;
  salePercent: number;
}

export interface Range {
  min: number;
  max: number;
}

export interface Slide {
  id: number;
  title: string;
  text: string;
  imgComponent: string;
}

export interface SorterOption {
  key: number;
  value: string;
  label: string;
}

export interface FilterItem {
  id: number;
  label: string;
}

export interface FilterParams {
  id: number;
  title: string;
  list: FilterItem[];
}
