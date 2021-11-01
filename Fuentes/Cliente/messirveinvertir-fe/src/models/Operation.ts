import { Account } from './Account';
import { Asset } from './Asset';

export interface Operation {
  id: number;
  account: Account;
  asset: Asset;
  quantity: number;
  usdPrice: number;
  type: OperationType;
  timestamp: string;
  avatar?: string;
}

type OperationType = 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';
