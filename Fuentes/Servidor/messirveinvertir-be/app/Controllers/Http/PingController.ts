import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PingController {
  /**
   * @swagger
   * /ping:
   *   get:
   *     tags:
   *       - General
   *     summary: See if the API is alive.
   *     responses:
   *       200:
   *         description: API is alive
   */
  public async ping({ response }: HttpContextContract) {
    return response.send('pong')
  }
}
