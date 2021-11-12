import axios from 'axios'
import querystring from 'querystring'
import { IolAuthenticationInterface, Token } from 'App/Exchanges/IOL'

export class IolTokenAuthentication implements IolAuthenticationInterface {
  constructor(private base: string, private _token?: Token) {}

  public async authenticate(username: string, password: string): Promise<Token> {
    const data = {
      username,
      password,
      grant_type: 'password',
    }
    this._token = await axios
      .post(this.base + '/token', querystring.encode(data))
      .then((r) => r.data)
    return this._token!
  }

  private tokenIsExpired(): boolean {
    return new Date(this._token!['.expires']).getDate() > Date.now() - 60 * 1000
  }

  private async refreshToken() {
    const data = {
      refresh_token: this._token!.refresh_token,
      grant_type: 'refresh_token',
    }
    this._token = await axios
      .post(this.base + '/token', querystring.encode(data))
      .then((r) => r.data)
  }

  public async token(): Promise<string> {
    if (this.tokenIsExpired()) {
      await this.refreshToken()
    }
    return this._token!.access_token
  }
}
