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
