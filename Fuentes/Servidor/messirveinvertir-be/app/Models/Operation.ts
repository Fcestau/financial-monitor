import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'

export enum OperationType {
  Buy = 'Buy',
  Sell = 'Sell',
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
}

export default class Operation extends BaseModel {
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

  @column.dateTime()
  public timestamp: DateTime

  @column()
  public quantity: number

  @column()
  public usdPrice: number

  @column()
  public type: OperationType

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  public unitUsdPrice(): number {
    return this.usdPrice / this.quantity
  }
}
