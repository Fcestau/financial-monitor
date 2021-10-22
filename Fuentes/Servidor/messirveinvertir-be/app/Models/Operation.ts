import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
