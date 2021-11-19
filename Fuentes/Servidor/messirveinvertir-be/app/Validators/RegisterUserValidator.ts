import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RegisterUserValidator {
  public schema = schema.create({
    display_name: schema.string({}, [rules.maxLength(50)]),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(50)]),
  })
  public messages = {}
}
