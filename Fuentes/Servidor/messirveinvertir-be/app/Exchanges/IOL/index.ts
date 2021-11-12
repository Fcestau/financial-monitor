import {
  GetOperationsFilter,
  IolOperation,
  PosicionModel,
} from 'App/Exchanges/IOL/Domain/IolOperation'

export interface Token {
  'access_token': string
  'refresh_token': string
  '.expires': string
}

export interface IolAuthenticationInterface {
  authenticate(username: string, password: string): Promise<Token>
  token(): Promise<string>
  setToken(token: Token): void
}

export default interface IolAdapterInterface {
  token(): Promise<string>
  fromToken(token: Token): IolAdapterInterface
  authenticate(username: string, password: string): Promise<Token>
  getOperations(filter?: GetOperationsFilter): Promise<IolOperation[]>
  getPositions(): Promise<PosicionModel[]>
}
