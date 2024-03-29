import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import AssetStock from 'App/Models/AssetStock'
import AccountsValuePoint from 'App/Models/AccountsValuePoint'

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

  public async storeAccountsValuePoint() {
    const assetStocks = await AssetStock.query().whereHas('account', (qb) =>
      qb.where('uid', this.uid)
    )

    let total = 0
    for (const assetStock of assetStocks) {
      await assetStock.load('asset')
      total += assetStock.usdLastPrice
    }

    await AccountsValuePoint.create({
      uid: this.uid,
      usdValue: total,
    })
  }
}
