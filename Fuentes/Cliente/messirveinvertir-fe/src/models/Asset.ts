export type AssetType =
  | 'Fiat'
  | 'Shares'
  | 'Cedears'
  | 'PublicTitles'
  | 'Crypto';

export interface Asset {
  id: number;
  name: string;
  symbol: string;
  type: AssetType;
  date?: string;
}
