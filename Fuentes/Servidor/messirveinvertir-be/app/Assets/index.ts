import AssetPriceDTO from 'App/Assets/Models/AssetPriceDTO'
import Asset from 'App/Models/Asset'

export default interface AssetServiceInterface {
  syncAssetsFor(uid: string): Promise<Asset[]>
  getAssetPrices(uid: string): Promise<AssetPriceDTO[]>
}
