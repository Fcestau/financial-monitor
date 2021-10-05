import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'OperationsController.operations')
}).prefix('operations')
