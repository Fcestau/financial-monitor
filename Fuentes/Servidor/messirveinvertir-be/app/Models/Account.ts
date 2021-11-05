import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operation, { OperationType } from 'App/Models/Operation'
import { GetOperationsFilter } from 'App/Exchanges/IOL/Domain/IolOperation'
import IOLService from '@ioc:messirve/IOLService'

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
  public data: JSON

  @column()
  public lastOperationsUpdate: Date

  @hasMany(() => Operation)
  public operations: HasMany<typeof Operation>

  public getAdapter() : AccountAdapterInterface{
    switch (this.type){
      case AccountType.IOL:
        return new IOLAccountAdapter(this)

      case AccountType.Manual:
        return new ManualAccountAdapter()
    }
  }

  public async downloadNewOperations() : Promise<Operation[]>{
    const accountAdapter = this.getAdapter()
    const filter = {
      from: this.lastOperationsUpdate,
      to: DateTime.utc().toJSDate()
    }
    this.lastOperationsUpdate = filter.to

    const newOperations = await accountAdapter.downloadNewOperations(filter)
    
    return await Operation.createMany(newOperations)
  }

  public async getAvgUsdBuyPrice(): Promise<number> {
    const account: Account = this
    await account.load('operations', (qb) => qb.where('type', OperationType.Buy))
    const sum = this.operations.reduce((sum: number, op: Operation) => sum + op.unitUsdPrice(), 0)
    return sum / this.operations.length
  }
}

export interface AccountAdapterInterface{
  downloadNewOperations(filter: GetOperationsFilter) : Promise<NewOperationDto[]>
}

export class ManualAccountAdapter implements AccountAdapterInterface{
  public async downloadNewOperations(_filter: GetOperationsFilter): Promise<NewOperationDto[]> {
    return []
  }
}

export class IOLAccountAdapter implements AccountAdapterInterface{
  private account : Account

  constructor(account: Account){
    this.account = account
  }

  public async downloadNewOperations(filter: GetOperationsFilter) : Promise<NewOperationDto[]>{
    return (await IOLService.getOperations(filter)).map((iolOperation) =>{
      return {
        accountId: this.account.id,
        timestamp: DateTime.fromSeconds(Number.parseInt(iolOperation.fechaOperada)),
        quantity: iolOperation.montoOperado,
        usdPrice: iolOperation.precioOperado,
        type: mapOperationType[iolOperation.tipo],
      }
    })
  }
}

type NewOperationDto = {
  accountId: number;
  timestamp: DateTime;
  quantity: number;
  usdPrice: number;
  type: OperationType;
}

const mapOperationType = {
  'buy': OperationType.Buy,
  'sell': OperationType.Sell,
}