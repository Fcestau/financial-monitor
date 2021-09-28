import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
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
