import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operation, { OperationType } from 'App/Models/Operation'
import AssetPriceDTO from 'App/Assets/Models/AssetPriceDTO'
import { IOLAccountAdapter } from 'App/Exchanges/IOL/Account/IOLAccountAdapter'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Asset from 'App/Models/Asset'

export enum AccountType {
  IOL = 'IOL',
  Manual = 'Manual',
}

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public uid: string

  @column()
  public type: AccountType

  @column()
  public name: string

  @column({ serializeAs: null })
  public data: string

  @column.dateTime()
  public lastOperationsUpdate?: DateTime

  @hasMany(() => Operation)
  public operations: HasMany<typeof Operation>

  public getData(): any {
    return Encryption.decrypt(this.data)
  }

  public getAdapter(): AccountAdapterInterface {
    switch (this.type) {
      case AccountType.IOL:
        return new IOLAccountAdapter(this)

      case AccountType.Manual:
        return new ManualAccountAdapter()
    }
  }

  public async downloadNewOperations(): Promise<Operation[]> {
    const accountAdapter = this.getAdapter()
    const from = this.lastOperationsUpdate
    const to = DateTime.utc()

    let newOperations = await accountAdapter.downloadNewOperations(from, to)
    const operations = await Promise.all(
      newOperations.map(async (op) => {
        const dbAsset = await Asset.firstOrCreate(
          { accountType: op.asset.accountType, symbol: op.asset.symbol },
          op.asset
        )
        return {
          accountId: this.id,
          assetId: dbAsset.id,
          usdPrice: op.usdPrice,
          quantity: op.quantity,
          timestamp: op.timestamp,
          type: op.type,
        }
      })
    )
    this.lastOperationsUpdate = to
    await this.save()

    return await Operation.createMany(operations)
  }

  public async getAvgUsdBuyPrice(): Promise<number> {
    const account: Account = this
    await account.load('operations', (qb) => qb.where('type', OperationType.Buy))
    const sum = this.operations.reduce((sum: number, op: Operation) => sum + op.unitUsdPrice(), 0)
    return sum / this.operations.length
  }
}

export interface AccountAdapterInterface {
  downloadNewOperations(from?: DateTime, to?: DateTime): Promise<NewOperationDto[]>
  getAssetPrices(): Promise<AssetPriceDTO[]>
  parseData(data: any): Promise<any>
}

export class ManualAccountAdapter implements AccountAdapterInterface {
  public async downloadNewOperations(): Promise<NewOperationDto[]> {
    return []
  }

  public getAssetPrices(): Promise<AssetPriceDTO[]> {
    return Promise.resolve([])
  }

  public parseData(data: any): Promise<any> {
    return data
  }
}

export interface NewOperationDto {
  accountId: number
  timestamp: DateTime
  quantity: number
  usdPrice: number
  type: OperationType
  asset: AssetPriceDTO
}
