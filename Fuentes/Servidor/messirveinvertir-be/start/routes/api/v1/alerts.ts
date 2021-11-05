import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'AlertsController.createAlerts')
})
  .prefix('alerts')
  .middleware('auth')
