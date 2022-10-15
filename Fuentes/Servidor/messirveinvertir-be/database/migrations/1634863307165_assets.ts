import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { AssetType } from 'App/Models/Asset'

export default class Assets extends BaseSchema {
  protected tableName = 'assets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('name').notNullable()
      table.string('symbol').notNullable()
      table.enum('type', Object.values(AssetType)).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
