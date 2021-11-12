import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { AccountType } from 'App/Models/Account'

export enum AssetType {
  Fiat = 'Fiat',
  Shares = 'Shares',
  Cedears = 'Cedears',
  PublicTitles = 'PublicTitles',
  Crypto = 'Crypto',
}

export default class Asset extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column()
  public symbol: string

  @column()
  public type: AssetType

  @column()
  public accountType: AccountType

  @column()
  public usdLastPrice: number
}
