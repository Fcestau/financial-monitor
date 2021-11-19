import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AssetsUsdLastHourPrices extends BaseSchema {
  protected tableName = 'assets'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('usd_last_hour_price').defaultTo(0)
      table.timestamp('usd_last_hour_price_update', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('usd_last_hour_price', 'usd_last_hour_price_update')
    })
  }
}
