import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('stock', 'AssetsController.getStock')
  Route.post('fetch', 'AssetsController.fetchAssets')
})
  .prefix('assets')
  .middleware('auth')
