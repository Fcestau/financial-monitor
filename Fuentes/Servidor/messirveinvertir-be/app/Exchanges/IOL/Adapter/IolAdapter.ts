import { AxiosInstance } from 'axios'
import axios from 'axios'
import {
  GetOperationsFilter,
  IolOperation,
  PosicionModel,
} from 'App/Exchanges/IOL/Domain/IolOperation'
import IolAdapterInterface, { IolAuthenticationInterface, Token } from 'App/Exchanges/IOL'
import clone from 'lodash/clone'
import { Exception } from '@poppinss/utils'

interface AdapterConfig {
  base: string
  auth: IolAuthenticationInterface
}

export default class IolAdapter implements IolAdapterInterface {
  constructor(private config: AdapterConfig) {
    this.config = config
  }

  public async token(): Promise<string> {
    return this.config.auth.token()
  }

  public fromToken(token: Token): IolAdapterInterface {
    const adapter = clone(this)
    adapter.config.auth.setToken(token)
    return adapter
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

  public async getOperations(filter?: GetOperationsFilter): Promise<IolOperation[]> {
    return (await this.axios())
      .get('/api/v2/operaciones', {
        params: {
          'filtro.estado': filter?.status,
          'filtro.fechaDesde': filter?.from,
          'filtro.fechaHasta': filter?.to,
        },
      })
      .catch(this.onError)
      .then(this.handleResponse)
  }

  public async getPositions(): Promise<PosicionModel[]> {
    return (await this.axios())
      .get('/api/v2/portafolio/argentina')
      .catch(this.onError)
      .then((r) => this.handleResponse(r).activos)
  }

  protected onError(e): void {
    console.log(e)
    throw new Exception(e.response.data.error_description || e.response.data.message)
  }

  protected handleResponse(r: any): any {
    if (r.data.message) {
      throw new Exception(`IOL Error: ${r.data.message}`)
    }
    return r.data
  }
}
