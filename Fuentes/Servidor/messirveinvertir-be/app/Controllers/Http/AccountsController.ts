import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class AccountsController {
  public async listAccounts({ auth, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const orderById = request.input('order_by_id')

    return await Account.query()
      .where('uid', auth.user!.uid)
      .orderBy('id', orderById)
      .paginate(page, limit)
  }

  public async createAccounts({ auth, request, response }: HttpContextContract) {
    const accounts = request.input('accounts')

    const createdAccounts = await Promise.all(
      accounts.map(async (account) => {
        let newAccount = new Account()
        newAccount.uid = auth.user!.uid
        newAccount.name = account.name
        newAccount.type = account.type
        try {
          const data = await newAccount.getAdapter().parseData(account.data)
          newAccount.data = Encryption.encrypt(data)
        } catch (e) {
          response.abort({ error: `Error persisting account data: ${e.message}` })
        }
        await newAccount.save()
        return { id: newAccount.id }
      })
    )

    return response.created({ accounts: createdAccounts })
  }

  public async deleteAccounts({ auth, request, response }: HttpContextContract) {
    const idDtos = request.input('accounts')
    const ids = idDtos.map((dto) => dto.id)

    await Account.query().where('uid', auth.user!.uid).whereIn('id', ids).delete()

    return response.noContent()
  }
}
