import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { IolTokenAuthentication } from 'App/Exchanges/IOL/Adapter/IolTokenAuthentication'
import IolAdapter from 'App/Exchanges/IOL/Adapter/IolAdapter'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('messirve/IOLService', () => {
      let base = process.env.IOL_API_BASE || 'https://api.invertironline.com'
      const auth = new IolTokenAuthentication(base)
      return new IolAdapter({ base, auth })
    })
  }

  public async boot() {
    await this.registerFakeUserProvider()
  }

  protected async registerFakeUserProvider() {
    const Auth = this.app.container.resolveBinding('Adonis/Addons/Auth')

    const { FakeAuthProvider } = await import('./FakeAuthProvider')

    Auth.extend('provider', 'fake', (_, __) => {
      return new FakeAuthProvider()
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
