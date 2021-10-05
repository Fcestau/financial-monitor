import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async listAccounts({ auth, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const orderById = request.input('orderById')

    return await Account.query()
      .where('uid', auth.user!.uid)
      .orderBy('id', orderById)
      .paginate(page, limit)
  }

  public async createAccounts({ auth, request }: HttpContextContract) {
    const accounts = request.input('accounts')

    return await accounts.map(async (account) => {
      let newAccount = await Account.create({
        uid: auth.user!.uid,
        name: account.name,
        type: account.type,
        data: JSON.parse('{}'),
      })

      return newAccount.id
    })
  }

  public async deleteAccounts({ auth, request, response }: HttpContextContract) {
    const accountIds = request.input('accounts')

    await Account.query().where('uid', auth.user!.uid).whereIn('id', accountIds).delete()

    return response.noContent
  }
}
