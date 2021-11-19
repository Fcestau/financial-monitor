import httpHandler from './httpHandler';
import tokenStore from '@/store/tokenStore';
import { AssetDto } from '@/models/DTOs/AssetDto';

export default new (class {
  iHttpHandler: any;
  token: any;
  path: string;
  constructor() {
    this.iHttpHandler = httpHandler;
    this.token = tokenStore.get();
    this.path = '/v1/assets';
  }

  async getAllAssets() {
    return this.iHttpHandler.get(this.path, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async addNewAsset(asset: AssetDto) {
    return this.iHttpHandler.post(this.path, asset, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }
})();
