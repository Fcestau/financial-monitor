import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccountValuePoint from 'App/Models/AccountsValuePoint'
import AssetStock from 'App/Models/AssetStock'

export default class AssetsController {
  public async getStock({ auth, request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const orderById = request.input('order_by_id')
    const assetIds = request.input('asset_id')
    const accountIds = request.input('account_id')

    const qb = AssetStock.query()
      .whereHas('account', (builder) => builder.where('uid', auth.user!.uid))
      .preload('account')
      .preload('asset')

    if (orderById) {
      qb.orderBy('id', orderById)
    }

    if (assetIds) {
      qb.whereIn('asset_id', assetIds)
    }

    if (accountIds) {
      qb.whereIn('account_id', accountIds)
    }

    const stock = (await qb.paginate(page, limit)).serialize()
    return response.json({
      ...stock,
      balance_graphic: await this.balanceGraphic(auth.user!.uid),
    })
  }
  protected async balanceGraphic(uid: string) {
    const valuePoints = await AccountValuePoint.query()
      .where('uid', uid)
      .orderBy('id', 'desc')
      .limit(1000)
      .exec()
    valuePoints.reverse()
    return {
      from: valuePoints[0]?.createdAt,
      to: valuePoints[-1]?.createdAt,
      points: valuePoints.map((p) => ({ x: p.createdAt, y: p.usdValue })),
    }
  }
}
