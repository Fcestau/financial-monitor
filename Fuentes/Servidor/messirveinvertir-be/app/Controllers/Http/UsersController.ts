import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import User from 'App/Models/User'
import { string } from '@ioc:Adonis/Core/Helpers'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterUserValidator)

    const user = await User.create({
      ...data,
      uid: string.generateRandom(32),
      password: await Hash.make(data.password),
    })

    return response.created(user)
  }
}
