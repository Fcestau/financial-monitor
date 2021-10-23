import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { OperationType } from 'App/Models/Operation'

export default class CreateOperationsValidator {
  public schema = schema.create({
    operations: schema.array().members(
      schema.object().members({
        account_id: schema.number([rules.exists({ table: 'accounts', column: 'id' })]),
        asset_id: schema.number([rules.exists({ table: 'assets', column: 'id' })]),
        quantity: schema.number(),
        usd_price: schema.number(),
        type: schema.enum(Object.values(OperationType)),
        timestamp: schema.date(),
      })
    ),
  })
  public messages = {}
}
