import { GetOperationsFilter, Operation } from 'App/Exchanges/IOL/Domain/Operation'

export interface Token {
  'access_token': string
  'refresh_token': string
  '.expires': string
}

export interface IolAuthenticationInterface {
  authenticate(username: string, password: string): Promise<Token>
  token(): Promise<string>
}

export default interface IolAdapterInterface {
  authenticate(username: string, password: string): Promise<Token>
  getOperations(filter?: GetOperationsFilter): Promise<Operation>
}
