import Account, { AccountType } from 'App/Models/Account'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'
import Asset, { AssetType } from 'App/Models/Asset'
import Operation, { OperationType } from 'App/Models/Operation'

export const AccountsFactory = Factory.define(Account, () => {
  return {
    uid: 'canawdljkncwjncwjnwcjwcnwjcnjwn',
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
    name: 'fakeAccount',
    type: AccountType.Manual,
    data: JSON.parse('{}'),
  }
})
  .relation('operations', () => OperationsFactory)
  .build()

export const AssetsFactory = Factory.define(Asset, () => {
  return {
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
    name: 'fakeAsset',
    symbol: 'FA',
    type: AssetType.Crypto,
  }
}).build()

export const OperationsFactory = Factory.define(Operation, ({ faker }) => {
  return {
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
    quantity: faker.datatype.number(),
    usdPrice: faker.datatype.number(),
    type: faker.random.arrayElement(Object.values(OperationType)),
    timestamp: DateTime.now(),
  }
}).build()
