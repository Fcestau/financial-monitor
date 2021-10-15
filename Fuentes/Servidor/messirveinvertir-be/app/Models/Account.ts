import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export enum AccountType {
  IOL = 'IOL',
  Manual = 'Manual'
}

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public uid: string

  @column()
  public type: AccountType

  @column()
  public name: string
  
  @column()
  public data: JSON
}