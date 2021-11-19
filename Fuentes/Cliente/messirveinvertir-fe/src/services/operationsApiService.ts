import { OperationDto } from '@/models/DTOs/OperationDto';
import httpHandler from './httpHandler';
import tokenStore from '@/store/tokenStore';

export default new (class {
  iHttpHandler: any;
  token: any;
  path: string;
  constructor() {
    this.iHttpHandler = httpHandler;
    this.token = tokenStore.get();
    this.path = '/v1/operations';
  }

  async getAllOperations() {
    return this.iHttpHandler.get(this.path, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async addNewOperation(operation: OperationDto) {
    return this.iHttpHandler.post(this.path, operation, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }

  async deleteOperation(operationId: string) {
    return this.iHttpHandler.delete(this.path, operationId, {
      headers: { Authorization: `Bearer ${await this.token}` },
    });
  }
})();
