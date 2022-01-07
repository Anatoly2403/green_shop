import { sortBy } from 'lodash';

export function withPercent(num: number, percent: number) {
  return Math.round(num - num * (percent / 100));
}

export function sorter<T>(
  arrayData: T[],
  sortParam: string,
  sortType?: 'asc' | 'dec'
) {
  const sorted = sortBy(arrayData, [sortParam]);
  return sortType === 'asc' || !sortType ? sorted : sorted.reverse();
}
