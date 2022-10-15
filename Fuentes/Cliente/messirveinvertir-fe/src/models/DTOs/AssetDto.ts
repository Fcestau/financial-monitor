import { AccountType } from '../Account';
import { AssetType } from '../Asset';

export interface AssetDto {
  name: string;
  symbol: string;
  type: AssetType;
  account_type: AccountType;
  usd_last_price: number;
}
