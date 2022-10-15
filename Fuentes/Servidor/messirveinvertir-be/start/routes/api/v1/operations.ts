import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'OperationsController.createOperations')
  Route.get('', 'OperationsController.listOperations')
  Route.delete('', 'OperationsController.deleteOperations')
  Route.post('fetch', 'OperationsController.fetchOperations')
})
  .prefix('operations')
  .middleware('auth')
