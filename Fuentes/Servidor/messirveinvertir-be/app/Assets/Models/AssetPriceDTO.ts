import { AccountType } from 'App/Models/Account'
import { AssetType } from 'App/Models/Asset'

export default class AssetPriceDTO {
  public accountType: AccountType
  public usdPrice: number
  public symbol: string
  public name: string
  public type: AssetType
}
