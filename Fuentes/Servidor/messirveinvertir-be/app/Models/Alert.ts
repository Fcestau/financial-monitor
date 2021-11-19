import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Asset from 'App/Models/Asset'

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
  public lastAlertTimestamp: DateTime

  @column()
  public frequency: AlertFrequency

  @column()
  public hourlyDeltaPrice: number

  @column()
  public hourlyDeltaVolume: number

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Account)
  public asset: BelongsTo<typeof Account>

  public static async getPendingAlerts(uid: string, asset: Asset) {
    return Alert.query()
      .whereHas('account', (qb) => qb.where('uid', uid))
      .where('assetId', asset.id)
      .where('hourlyDeltaPrice', '<=', asset.hourlyDeltaPrice)
      .where((qb) => {
        qb.where('frequency', AlertFrequency.Always)
          .orWhere((qb) => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            qb.where('frequency', AlertFrequency.Daily).where((qb) =>
              qb.whereNull('lastAlertTimestamp').orWhere('lastAlertTimestamp', '<=', yesterday)
            )
          })
          .orWhere((qb) => {
            qb.where('frequency', AlertFrequency.Unique).whereNull('lastAlertTimestamp')
          })
      })
  }
}
