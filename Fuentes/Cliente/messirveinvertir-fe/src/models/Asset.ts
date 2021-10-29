export type AssetType =
  | 'Fiat'
  | 'Shares'
  | 'Cedears'
  | 'Public Titles'
  | 'Crypto';

export interface Asset {
  name: string;
  symbol: string;
  type: AssetType;
  date?: string;
}

export const assetMockValues: Asset[] = [
  {
    symbol: 'usd',
    name: 'USD',
    type: 'Fiat',
  },
  {
    symbol: 'pesoArg',
    name: 'Peso Argentino',
    type: 'Fiat',
  },
  {
    symbol: 'pesoUru',
    name: 'Peso Uruguayo',
    type: 'Fiat',
  },
  {
    symbol: 'bitcoin',
    name: 'Bitcoin',
    type: 'Crypto',
  },
];
