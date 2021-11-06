import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { AlertFrequency } from 'App/Models/Alert'

export default class CreateAlertsValidator {
  public schema = schema.create({
    alerts: schema.array().members(
      schema.object().members({
        account_id: schema.number([rules.exists({ table: 'accounts', column: 'id' })]),
        asset_id: schema.number([rules.exists({ table: 'assets', column: 'id' })]),
        frequency: schema.enum(Object.values(AlertFrequency)),
        hourly_delta_price: schema.number([rules.range(0, 100)]),
        hourly_delta_volume: schema.number([rules.range(0, 100)]),
      })
    ),
  })
  public messages = {}
}
