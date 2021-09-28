import type { FakeAuthProvider, FakeAuthProviderConfig } from '../providers/FakeAuthProvider'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: FakeAuthProvider
      config: FakeAuthProviderConfig
    }
  }
  interface GuardsList {
    api: {
      implementation: OATGuardContract<'user', 'api'>
      config: OATGuardConfig<'user'>
    }
  }
}
