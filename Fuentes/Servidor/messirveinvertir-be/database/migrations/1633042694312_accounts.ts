import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { AccountType } from 'App/Models/Account'

export default class Accounts extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uid').notNullable()
      table.string('name').notNullable()
      table.text('data').notNullable()
      table.enum('type', [AccountType.IOL, AccountType.Manual], {
        useNative: true,
        enumName: 'account_type',
        existingType: false,
      })

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
