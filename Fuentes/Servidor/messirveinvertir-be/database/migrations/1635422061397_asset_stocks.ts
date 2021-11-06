import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AssetStocks extends BaseSchema {
  protected tableName = 'asset_stocks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.bigInteger('account_id').notNullable()
      table.foreign('account_id').references('accounts.id')
      table.bigInteger('asset_id').notNullable()
      table.foreign('asset_id').references('assets.id')
      table.float('quantity').notNullable()
      table.float('avg_usd_buy_price').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
