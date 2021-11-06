import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('stock', 'AssetsController.getStock')
})
  .prefix('assets')
  .middleware('auth')
