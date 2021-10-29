import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AccountsFactory, AssetsFactory } from 'Database/factories'

export default class OperationsSeeder extends BaseSeeder {
  public async run() {
    const asset = await AssetsFactory.create()
    await AccountsFactory.with('operations', 2, (operation) =>
      operation.merge({ assetId: asset.id })
    ).create()
  }
}
