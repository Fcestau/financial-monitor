import AssetServiceInterface from 'App/Assets'
import AssetPriceDTO from 'App/Assets/Models/AssetPriceDTO'
import Account from 'App/Models/Account'
import Asset from 'App/Models/Asset'

export default class AssetService implements AssetServiceInterface {
  public async syncAssetsFor(uid: string): Promise<Asset[]> {
    const assetsData = await this.getAssetPrices(uid)
    const assets = assetsData.map((data) => ({
      symbol: data.symbol,
      name: data.name,
      type: data.type,
      usdLastPrice: data.usdLastPrice,
      accountType: data.accountType,
    }))
    return Asset.updateOrCreateMany(['symbol', 'accountType'], assets)
  }
  public async getAssetPrices(uid: string): Promise<AssetPriceDTO[]> {
    const r = {}
    const accounts = await Account.query().where('uid', uid)
    for (const account of accounts) {
      const assets = await account.getAdapter().getAssetPrices()
      for (const asset of assets) {
        r[asset.symbol] = asset
      }
    }
    return Object.values(r)
  }
}
