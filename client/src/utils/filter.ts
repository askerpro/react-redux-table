import { Data } from 'models';

export type Filter = Partial<Data>;

export const getFilters = (data: Data[]) => {
  const markets: Map<string, string[]> = new Map();
  data.forEach((Coin) => {
    if (!markets.has(Coin.pn)) {
      markets.set(Coin.pn, [Coin.q]);
    }
    if (!markets.get(Coin.pn)!.includes(Coin.q)) {
      markets.set(Coin.pn, [...markets.get(Coin.pn)!, Coin.q]);
    }
  });

  return markets;
};

export const filterFunc = (filter: Filter, searchSymbols: string) => (value: Data) => {
  const passedFilters = (Object.keys(filter) as Array<keyof typeof filter>).reduce(
    (passedFiltersCount, filterProp) => {
      if (value[filterProp] === filter[filterProp]) return passedFiltersCount + 1;
      return passedFiltersCount;
    },
    0,
  );

  const isIncluded =
    passedFilters === Object.keys(filter).length && value.b.includes(searchSymbols.toUpperCase());

  return isIncluded;
};
