import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccountValuePoint from 'App/Models/AccountsValuePoint'
import AssetStock from 'App/Models/AssetStock'
import AssetService from 'App/Assets/Service/AssetService'
import CreateAssetsValidator from 'App/Validators/CreateAssetsValidator'
import Asset from 'App/Models/Asset'
import Event from '@ioc:Adonis/Core/Event'

export default class AssetsController {
  public async createAssets({ request, response }) {
    const data = await request.validate(CreateAssetsValidator)
    const createdAssets: { id: number }[] = []

    for (const assetData of data.assets) {
      let newAsset = await Asset.create(assetData)
      createdAssets.push({ id: newAsset.id })
    }

    return response.created({ assets: createdAssets })
  }
  public async listAssets({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const orderById = request.input('order_by_id')
    const name = request.input('name')
    const symbol = request.input('symbol')

    const qb = Asset.query()

    if (orderById) {
      qb.orderBy('id', orderById)
    }
    if (name) {
      qb.where('name', 'like', `%${name}%`)
    }
    if (symbol) {
      qb.where('symbol', 'like', `%${symbol}%`)
    }

    return await qb.paginate(page, limit)
  }
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
      to: valuePoints.slice(-1)[0]?.createdAt,
      points: valuePoints.map((p) => ({ x: p.createdAt, y: p.usdValue })),
    }
  }
  public async fetchAssets({ auth, response }) {
    try {
      const assets = await new AssetService().syncAssetsFor(auth.user.uid!)
      await Event.emit('fetched:assets', { uid: auth.user.uid!, assets })
      await auth.user!.storeAccountsValuePoint()
      return response.json({ assets })
    } catch (e) {
      response.abort({ error: e.message })
    }
  }
}
