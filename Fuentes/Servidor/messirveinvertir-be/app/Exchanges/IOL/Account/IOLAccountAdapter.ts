import IolAdapterInterface from 'App/Exchanges/IOL'
import IOLService from '@ioc:messirve/IOLService'
import {
  GetOperationsFilter,
  OperationStatusFilter,
  TipoOperacion,
} from 'App/Exchanges/IOL/Domain/IolOperation'
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

  protected async adapter(): Promise<IolAdapterInterface> {
    const data = this.account.getData()
    await IOLService.authenticate(data.username!, data.password!)
    return IOLService
  }

  public async downloadNewOperations(from?: Date, to?: Date): Promise<NewOperationDto[]> {
    const filter: GetOperationsFilter = {
      from,
      to,
      status: OperationStatusFilter.finished,
    }
    return (await (await this.adapter()).getOperations(filter)).map((iolOperation) => {
      return {
        accountId: this.account.id,
        timestamp: DateTime.fromISO(iolOperation.fechaOperada),
        quantity: iolOperation.cantidadOperada || 0,
        usdPrice: iolOperation.montoOperado || 0,
        type: this.mapOperationType(iolOperation.tipo),
        asset: {
          accountType: AccountType.IOL,
          usdLastPrice: iolOperation.precioOperado || 0,
          name: iolOperation.simbolo,
          type: AssetType.Shares,
          symbol: iolOperation.simbolo,
        },
      }
    })
  }

  protected mapOperationType(type: TipoOperacion): OperationType {
    return {
      'Compra': OperationType.Buy,
      'Venta': OperationType.Sell,
      'Pago de Dividendos': OperationType.Deposit,
    }[type]
  }

  public async getAssetPrices(): Promise<AssetPriceDTO[]> {
    return (await (await this.adapter()).getPositions()).map((iolPosition) => ({
      accountType: AccountType.IOL,
      usdLastPrice: iolPosition.ultimoPrecio,
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
      await IOLService.authenticate(data.username!, data.password!)
      return data
    } catch (e) {
      console.log(e)
      throw new Exception(e.response.data.error_description)
    }
  }
}
