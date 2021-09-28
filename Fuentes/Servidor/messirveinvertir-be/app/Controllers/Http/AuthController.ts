import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async attempt({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      return await auth.use('api').attempt(email, password)
    } catch {
      return response.badRequest({
        message: 'Invalid credentials.',
        plain_errors: ['The given credentials were invalid.'],
      })
    }
  }
  public async user({ auth }) {
    return auth.user
  }
  public async revoke({ auth, response }) {
    await auth.use('api').revoke()
    return response.noContent()
  }
}
