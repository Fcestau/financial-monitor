import { AxiosInstance } from 'axios'
import axios from 'axios'
import { GetOperationsFilter, Operation } from 'App/Exchanges/IOL/Domain/Operation'
import IolAdapterInterface, { IolAuthenticationInterface, Token } from 'App/Exchanges/IOL'

interface AdapterConfig {
  base: string
  auth: IolAuthenticationInterface
}

export default class IolAdapter implements IolAdapterInterface {
  constructor(private config: AdapterConfig) {
    this.config = config
  }

  private async token(): Promise<string> {
    return this.config.auth.token()
  }

  private async axios(): Promise<AxiosInstance> {
    const token = await this.token()
    return axios.create({
      baseURL: this.config.base,
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    })
  }

  public authenticate(username: string, password: string): Promise<Token> {
    return this.config.auth.authenticate(username, password)
  }

  public async getOperations(filter?: GetOperationsFilter): Promise<Operation> {
    return (await this.axios())
      .get('/api/v2/operaciones', {
        params: {
          'filtro.estado': filter?.status,
          'filtro.fechaDesde': filter?.from,
          'filtro.fechaHasta': filter?.to,
        },
      })
      .then((r) => r.data)
  }
}
