import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'AlertsController.getAlerts')
  Route.post('', 'AlertsController.createAlerts')
  Route.delete('', 'AlertsController.deleteAlerts')
})
  .prefix('alerts')
  .middleware('auth')
