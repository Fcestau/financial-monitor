import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import Asset from 'App/Models/Asset'
import Alert from 'App/Models/Alert'
import { DateTime } from 'luxon'

export default class SendAlertNotification {
  public async onFetchedAssets(data: EventsList['fetched:assets']) {
    await Promise.all(data.assets.map((asset) => this.notify(data.uid, asset)))
  }

  private async notify(uid: string, asset: Asset) {
    const pendingAlerts = await Alert.getPendingAlerts(uid, asset)
    console.log(pendingAlerts)
    await Promise.all(
      pendingAlerts.map(async (alert) => {
        await SendAlertNotification.sendNotification(uid, asset)
        alert.lastAlertTimestamp = DateTime.now()
        await alert.save()
      })
    )
    return asset.updateUsdLastHourPrice()
  }

  private static sendNotification(uid: string, asset: Asset) {
    const notification = {
      title: `${asset.symbol} está en movimiento!`,
      body: `El precio varió un ${asset.hourlyDeltaPrice}% en la última hora hasta los ${asset.symbol} ${asset.usdLastPrice}`,
      topic: uid,
    }
    return Event.emit('new:notification', notification)
  }
}
