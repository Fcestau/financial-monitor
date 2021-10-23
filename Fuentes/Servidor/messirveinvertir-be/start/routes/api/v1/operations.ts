import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'OperationsController.createOperations')
  Route.get('/', 'OperationsController.listOperations')
})
  .prefix('operations')
  .middleware('auth')
