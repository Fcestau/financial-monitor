export interface Account {
  id: number;
  name: string;
  type: string;
  createdAt: string;
  avatar?: string;
  assetType?: string;
  balance?: number;
}

export type AccountType = 'IOL' | 'Manual';
