import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uid').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('display_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
