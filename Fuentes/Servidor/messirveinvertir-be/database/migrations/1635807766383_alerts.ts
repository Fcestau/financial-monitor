import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { AlertFrequency } from 'App/Models/Alert'

export default class Alerts extends BaseSchema {
  protected tableName = 'alerts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.bigInteger('account_id').notNullable()
      table.foreign('account_id').references('accounts.id')
      table.bigInteger('asset_id').notNullable()
      table.foreign('asset_id').references('assets.id')
      table.enum('frequency', Object.values(AlertFrequency)).notNullable()
      table.float('hourly_delta_price').notNullable()
      table.float('hourly_delta_volume').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
