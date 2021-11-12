import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'AccountsController.listAccounts')
  Route.post('', 'AccountsController.createAccounts')
  Route.delete('', 'AccountsController.deleteAccounts')
})
  .prefix('accounts')
  .middleware('auth')
