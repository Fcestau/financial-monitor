import Operation from 'App/Models/Operation'
import Notification from 'App/Models/Notification'
import Asset from 'App/Models/Asset'

declare module '@ioc:Adonis/Core/Event' {
  interface EventsList {
    'new:notification': Notification
    'new:operations': Operation[]
    'fetched:assets': {
      uid: string
      assets: Asset[]
    }
  }
}
