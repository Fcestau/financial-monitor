/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  require('./routes/api/v1/index')
}).prefix('/api/v1')

Route.group(() => {
  Route.get('', 'PingController.ping')
  Route.post('/notification', 'PingController.notification').middleware('auth')
}).prefix('/ping')
Route.get('/', async ({ response }) => {
  return response.redirect('/docs')
})
