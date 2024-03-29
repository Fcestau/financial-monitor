import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthMiddleware {
  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    for (let guard of guards) {
      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        return true
      }
    }

    return false
  }

  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    const guards = customGuards.length ? customGuards : [auth.name]
    if (!(await this.authenticate(auth, guards))) {
      return response.unauthorized({
        message: 'Unauthenticated.',
      })
    }
    await next()
  }
}
