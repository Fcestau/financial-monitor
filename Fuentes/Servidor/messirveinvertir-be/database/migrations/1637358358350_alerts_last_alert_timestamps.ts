import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlertsLastAlertTimestamps extends BaseSchema {
  protected tableName = 'alerts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('last_alert_timestamp', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_alert_timestamp')
    })
  }
}
