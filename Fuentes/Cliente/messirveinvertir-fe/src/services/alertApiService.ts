import { AlertDto } from '@/models/DTOs/AlertDto';
import httpHandler from './httpHandler';
import tokenStore from '@/store/tokenStore';

export default new (class {
  iHttpHandler: any;
  token: any;
  path: string
  constructor() {
    this.iHttpHandler = httpHandler;
    this.token = tokenStore.get();
    this.path = '/v1/alerts';
  }

  async getAllAlerts() {
    return this.iHttpHandler.get(this.path, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async addNewAlert(alert: AlertDto) {
    return this.iHttpHandler.post(this.path, alert, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async deleteAlert(alertId: string) {
    return this.iHttpHandler.delete(this.path, {
      data: alertId,
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }
})();