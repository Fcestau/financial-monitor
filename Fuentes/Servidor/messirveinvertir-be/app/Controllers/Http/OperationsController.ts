import Operation from 'App/Models/Operation'
import CreateOperationsValidator from 'App/Validators/CreateOperationsValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AccountType } from 'App/Models/Account'
import Event from '@ioc:Adonis/Core/Event'

export default class OperationsController {
  public async createOperations({ request, response }) {
    const data = await request.validate(CreateOperationsValidator)
    const createdOperations: { id: number }[] = []

    for (const opData of data.operations) {
      let newOperation = await Operation.create(opData)
      await Event.emit('new:operation', newOperation)
      createdOperations.push({ id: newOperation.id })
    }

    return response.created({ operations: createdOperations })
  }
  public async listOperations({ auth, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const orderById = request.input('order_by_id')
    const dateFrom = request.input('date_from')
    const dateTo = request.input('date_to')

    const qb = Operation.query().whereHas('account', (builder) =>
      builder.where('uid', auth.user!.uid)
    )

    if (orderById) {
      qb.orderBy('id', orderById)
    }
    if (dateFrom) {
      qb.where('timestamp', '>=', dateFrom)
    }
    if (dateTo) {
      qb.where('timestamp', '<=', dateTo)
    }

    return await qb.paginate(page, limit)
  }
  public async deleteOperations({ auth, request, response }: HttpContextContract) {
    const ids = request.input('operations').map((dto) => dto.id)

    await Operation.query()
      .whereHas('account', (builder) =>
        builder.where('uid', auth.user!.uid).where('type', AccountType.Manual)
      )
      .whereIn('id', ids)
      .delete()

    return response.noContent()
  }
}
