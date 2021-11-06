import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AccountsValuePoints extends BaseSchema {
  protected tableName = 'accounts_value_points'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.string('uid').notNullable()
      table.float('usd_value').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
