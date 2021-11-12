import IolAdapterInterface from 'App/Exchanges/IOL'
import IOLService from '@ioc:messirve/IOLService'
import { GetOperationsFilter, TipoOperacion } from 'App/Exchanges/IOL/Domain/IolOperation'
import { DateTime } from 'luxon'
import AssetPriceDTO from 'App/Assets/Models/AssetPriceDTO'
import { AssetType } from 'App/Models/Asset'
import { Exception } from '@poppinss/utils'
import Account, { AccountAdapterInterface, AccountType, NewOperationDto } from 'App/Models/Account'
import { OperationType } from 'App/Models/Operation'

export class IOLAccountAdapter implements AccountAdapterInterface {
  private account: Account

  constructor(account: Account) {
    this.account = account
  }

  protected adapter(): IolAdapterInterface {
    return IOLService.fromToken(this.account.data.token!)
  }

  public async downloadNewOperations(filter: GetOperationsFilter): Promise<NewOperationDto[]> {
    return (await this.adapter().getOperations(filter)).map((iolOperation) => {
      return {
        accountId: this.account.id,
        timestamp: DateTime.fromSeconds(Number.parseInt(iolOperation.fechaOperada)),
        quantity: iolOperation.montoOperado,
        usdPrice: iolOperation.precioOperado,
        type: this.mapOperationType(iolOperation.tipo),
      }
    })
  }

  protected mapOperationType(type: TipoOperacion): OperationType {
    return {
      buy: OperationType.Buy,
      sell: OperationType.Sell,
    }[type]
  }

  public async getAssetPrices(): Promise<AssetPriceDTO[]> {
    return (await this.adapter().getPositions()).map((iolPosition) => ({
      accountType: AccountType.IOL,
      usdPrice: iolPosition.ultimoPrecio,
      name: iolPosition.titulo.descripcion,
      type: this.mapAssetType(iolPosition.titulo.tipo),
      symbol: iolPosition.titulo.simbolo,
    }))
  }

  protected mapAssetType(type: string): AssetType {
    return (
      {
        BONOS: AssetType.PublicTitles,
        TITULOSPUBLICOS: AssetType.PublicTitles,
        CEDEARS: AssetType.Cedears,
      }[type] || AssetType.Shares
    )
  }

  public async parseData(data: any): Promise<any> {
    try {
      const token = await IOLService.authenticate(data.username!, data.password!)
      return { token }
    } catch (e) {
      console.log(e)
      throw new Exception(e.response.data.error_description)
    }
  }
}
