import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AccountsValuePoint extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public uid: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column()
    public usdValue: number
}