import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Asset from './Asset'

export default class AssetStock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public quantity: number

  @column()
  public avgUsdBuyPrice: number

  @column()
  public accountId: number

  @column()
  public assetId: number

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Asset)
  public asset: BelongsTo<typeof Asset>

  @computed()
  public get usdLastPrice(): number {
    return this.quantity * this.asset.usdLastPrice
  }
}
