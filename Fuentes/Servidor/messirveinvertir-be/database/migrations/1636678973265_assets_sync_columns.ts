import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { AccountType } from 'App/Models/Account'

export default class AssetsSyncColumns extends BaseSchema {
  protected tableName = 'assets'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('usd_last_price').notNullable()
      table.enum('account_type', Object.values(AccountType)).notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('usd_last_price', 'account_type')
    })
  }
}
