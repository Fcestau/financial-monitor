import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public uid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public displayName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @computed()
  public get photoUrl(): string {
    return `https://ui-avatars.com/api/?name=${this.displayName.replace(' ', '+')}Doe&rounded=true`
  }
}
