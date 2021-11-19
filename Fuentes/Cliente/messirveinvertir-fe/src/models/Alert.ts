import { Account } from './Account';
export interface Alert {
  created_at: string;
  updated_at: string;
  account_id: number;
  asset_id: number;
  frequency: string;
  hourly_delta_price: string;
  hourly_delta_volume: string;
  account: Account;
}

      
