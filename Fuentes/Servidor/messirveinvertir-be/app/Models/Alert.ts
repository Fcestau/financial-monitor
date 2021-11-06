import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'

export enum AlertFrequency {
  Unique = 'Unique',
  Daily = 'Daily',
  Always = 'Always',
}

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public accountId: number

  @column()
  public assetId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public frequency: AlertFrequency

  @column()
  public hourlyDeltaPrice: number

  @column()
  public hourlyDeltaVolume: number

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>
}
