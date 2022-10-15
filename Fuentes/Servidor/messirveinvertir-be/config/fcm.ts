import Env from '@ioc:Adonis/Core/Env'
import { FCMConfig } from '@ioc:Adonis/Addons/FCM'

const fcmConfig: FCMConfig = {
  apiKey: Env.get('FCM_API_KEY'),

  requestOptions: {
    // proxy: 'http://127.0.0.1',
    // timeout: 5000
  },
}
export default fcmConfig
