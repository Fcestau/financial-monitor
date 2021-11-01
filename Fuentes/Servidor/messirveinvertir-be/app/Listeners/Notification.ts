import { EventsList } from '@ioc:Adonis/Core/Event'
import FCM from '@ioc:Adonis/Addons/FCM'

export default class Notification {
  public async onNewNotification(notification: EventsList['new:notification']) {
    const recipients = { condition: `'${notification.uid}' in topics` }
    await FCM.send(
      {
        notification: {
          title: notification.title,
          body: notification.body,
        },
      },
      recipients
    )
  }
}
