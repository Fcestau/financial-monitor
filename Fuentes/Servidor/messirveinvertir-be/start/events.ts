import Event from '@ioc:Adonis/Core/Event'

Event.on('new:notification', 'Notification.onNewNotification')
Event.on('new:operations', 'OperationListener.onNew')
Event.on('fetched:assets', 'SendAlertNotification.onFetchedAssets')
