import Account from 'App/Models/Account'
import Operation from 'App/Models/Operation'
import CreateOperationsValidator from 'App/Validators/CreateOperationsValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperationsController {
  public async createOperations({ request, response }) {
    const data = await request.validate(CreateOperationsValidator)

    const createdOperations = await Promise.all(
      data.operations.map(async (data) => {
        let newOperation = await Operation.create(data)
        return { id: newOperation.id }
      })
    )

    return response.created({ operations: createdOperations })
  }
  /**
   * @swagger
   * /api/v1/operations:
   *   get:
   *     tags:
   *       - Operations
   *     summary: Get operations.
   *     responses:
   *       200:
   *         description: Operations list
   */
  public async operations({ request, response }: HttpContextContract) {
    const account = await Account.find(request.input('account_id'))

    if (account != null){      
      const operations = Operation
        .query()
        .where('accountId',account.id)

      return response.ok(operations)
    }
    else{
      return response.notFound()
    }
  }
}
