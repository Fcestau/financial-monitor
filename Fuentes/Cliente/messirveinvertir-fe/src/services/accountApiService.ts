import httpHandler from './httpHandler';
import tokenStore from '@/store/tokenStore';
import { AccountDto } from '@/models/DTOs/AccountDto';

export default new (class {
  iHttpHandler: any;
  token: any;
  path: string;
  constructor() {
    this.iHttpHandler = httpHandler;
    this.token = tokenStore.get();
    this.path = '/v1/accounts';
  }

  async getAllAccounts() {
    return this.iHttpHandler.get(this.path, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async addNewAccount(account: AccountDto) {
    return this.iHttpHandler.post(this.path, account, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async deleteAccount(accountId: string) {
    return this.iHttpHandler.delete(this.path, accountId, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }
})();
