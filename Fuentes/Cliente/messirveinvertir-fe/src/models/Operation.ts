export interface Operation {
  id: number;
  accountId: number;
  assetId: number;
  quantity: number;
  usdPrice: number;
  type: OperationType;
  timestamp: string;
  avatar?: string;
}
type OperationType = 'IOL' | 'Manual';
