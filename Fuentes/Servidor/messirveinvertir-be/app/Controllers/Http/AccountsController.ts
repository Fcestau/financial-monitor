import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {

  public async listAccounts({ auth, request }: HttpContextContract) {
    const page = request.input('page',1)
    const limit = request.input('limit',10)
    const orderById = request.input('orderById')
    
    return await Account.query()
      .where('uid', auth.user!.uid)
      .orderBy('id', orderById)
      .paginate(page, limit)
  }

   public async createAccounts({ auth, request, response }: HttpContextContract) {
    const accounts = request.input('accounts')

    const createdAccounts = await Promise.all(
      accounts.map(async (account) => {
        let newAccount = await Account.create({
          uid: auth.user!.uid,
          name: account.name,
          type: account.type,
          data: JSON.parse('{}')
        })
        return { id: newAccount.id }
      }
    ))
    
    return response.created({ accounts: createdAccounts })
  }

   public async deleteAccounts({ auth, request, response }: HttpContextContract) {
    const idDtos = request.input('accounts')
    const ids = idDtos.map((dto) => dto.id)
    
    await Account.query()
      .where('uid',auth.user!.uid)
      .whereIn('id', ids)
      .delete()

    return response.noContent()
  }
}
