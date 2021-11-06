import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'

export default class PingController {
  public async ping({ response }: HttpContextContract) {
    return response.send('pong')
  }
  public async notification({ request, response, auth }: HttpContextContract) {
    const notification = {
      title: request.input('title', 'Test notification'),
      body: request.input('body', 'Test notification body'),
      topic: auth.user?.uid!,
    }
    await Event.emit('new:notification', notification)
    return response.send({ notification })
  }
}
