import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { OperationType } from 'App/Models/Operation'

export default class Operations extends BaseSchema {
  protected tableName = 'operations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.bigInteger('account_id').notNullable()
      table.foreign('account_id').references('accounts.id')
      table.bigInteger('asset_id').notNullable()
      table.foreign('asset_id').references('assets.id')
      table.timestamp('timestamp', { useTz: true }).notNullable()
      table.float('quantity').notNullable()
      table.float('usd_price').notNullable()
      table.enum('type', Object.values(OperationType)).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
