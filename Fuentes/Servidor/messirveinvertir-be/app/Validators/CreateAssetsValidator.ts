import { schema } from '@ioc:Adonis/Core/Validator'
import { AssetType } from 'App/Models/Asset'
import { AccountType } from 'App/Models/Account'

export default class CreateAssetsValidator {
  public schema = schema.create({
    assets: schema.array().members(
      schema.object().members({
        name: schema.string(),
        symbol: schema.string(),
        type: schema.enum(Object.values(AssetType)),
        account_type: schema.enum(Object.values(AccountType)),
        usd_last_price: schema.number(),
      })
    ),
  })
  public messages = {}
}
