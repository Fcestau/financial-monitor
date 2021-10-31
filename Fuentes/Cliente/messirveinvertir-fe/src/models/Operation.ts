export interface Operation {
  id: number;
  accountId: number;
  assetId: number;
  quantity: number;
  usdPrice: number;
  type: string;
  timestamp: string;
}
