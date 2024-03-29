import Operation from 'App/Models/Operation'
import CreateOperationsValidator from 'App/Validators/CreateOperationsValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account, { AccountType } from 'App/Models/Account'
import Event from '@ioc:Adonis/Core/Event'
import { preload } from 'App/Helpers/Query'

export default class OperationsController {
  public async createOperations({ auth, request, response }) {
    const data = await request.validate(CreateOperationsValidator)
    const createdOperations: { id: number }[] = []

    for (const opData of data.operations) {
      let newOperation = await Operation.create(opData)
      await Event.emit('new:operations', [newOperation])
      await auth.user!.storeAccountsValuePoint()
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

    return await preload(await qb.paginate(page, limit), ['asset', 'account'])
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
  public async fetchOperations({ auth, response }) {
    try {
      const accounts = await Account.query().where('uid', auth.user!.uid)
      const operations: Operation[] = []
      for (const account of accounts) {
        operations.push(...(await account.downloadNewOperations()))
      }
      await Event.emit('new:operations', operations)
      await auth.user!.storeAccountsValuePoint()
      return response.created({ operations })
    } catch (e) {
      console.log(e)
      response.abort({ error: e.message })
    }
  }
}
