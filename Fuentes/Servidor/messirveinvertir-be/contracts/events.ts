import { OperationType } from 'App/Models/Operation'
import Notification from 'App/Models/Notification'
import Asset from 'App/Models/Asset'

declare module '@ioc:Adonis/Core/Event' {
  interface EventsList {
    'new:notification': Notification
    'new:operation': {
      id: number
      accountId: number
      assetId: number
      usdPrice: number
      quantity: number
      type: OperationType
    }
    'fetched:assets': {
      uid: string
      assets: Asset[]
    }
  }
}
