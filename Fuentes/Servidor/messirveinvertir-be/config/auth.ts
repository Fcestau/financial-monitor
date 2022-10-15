import { AuthConfig } from '@ioc:Adonis/Addons/Auth'
import Env from '@ioc:Adonis/Core/Env'

const authConfig: AuthConfig = {
  guard: Env.get('AUTH_GUARD', 'api'),
  guards: {
    fake: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_uid',
      },

      provider: {
        driver: 'fake',
      },
    },
    api: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_uid',
      },

      provider: {
        driver: 'lucid',
        identifierKey: 'uid',
        uids: ['email'],
        model: () => import('App/Models/User'),
      },
    },
  },
}

export default authConfig
