import Account, { AccountType } from 'App/Models/Account'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export const AccountsFactory = Factory
  .define(Account, () => {
    return {
      uid: 'canawdljkncwjncwjnwcjwcnwjcnjwn',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      name: 'fakeAccount',
      type: AccountType.IOL,
      data: JSON.parse('{}')
    }
  })
  .build()