import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('', async () => 'AccountsController.listAccounts')
    Route.post('', 'AccountsController.createAccounts')
    Route.delete('', 'AccountsController.deleteAccounts')
}).prefix('accounts').middleware('auth')