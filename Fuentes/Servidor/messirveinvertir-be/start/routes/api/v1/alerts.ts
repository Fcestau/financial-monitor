import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'AlertsController.getAlerts')
  Route.post('', 'AlertsController.createAlerts')
  Route.delete('', 'AlertsController.createAlerts')
})
  .prefix('alerts')
  .middleware('auth')
