import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/register', 'UsersController.register')
  Route.post('/login', 'AuthController.attempt')
  Route.get('/user', 'AuthController.user').middleware('auth')
  Route.get('/logout', 'AuthController.revoke').middleware('auth')
}).prefix('auth')
