import type { FakeAuthProvider, FakeAuthProviderConfig } from '../providers/FakeAuthProvider'
import User from 'App/Models/User'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    fake: {
      implementation: FakeAuthProvider
      config: FakeAuthProviderConfig
    }
    user: {
      implementation: LucidProviderContract<typeof User>
      config: LucidProviderConfig<typeof User>
    }
  }
  interface GuardsList {
    fake: {
      implementation: OATGuardContract<'fake', 'api'>
      config: OATGuardConfig<'fake'>
    }
    api: {
      implementation: OATGuardContract<'user', 'api'>
      config: OATGuardConfig<'user'>
    }
  }
}
