import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operation, { OperationType } from 'App/Models/Operation'

export enum AccountType {
  IOL = 'IOL',
  Manual = 'Manual',
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

  @column({ serializeAs: null })
  public data: JSON

  @hasMany(() => Operation)
  public operations: HasMany<typeof Operation>

  public async getAvgUsdBuyPrice(): Promise<number> {
    await this.load('operations', (qb) => qb.where('type', OperationType.Buy))
    const sum = this.operations.reduce((sum: number, op: Operation) => sum + op.unitUsdPrice(), 0)
    return sum / this.operations.length
  }
}
