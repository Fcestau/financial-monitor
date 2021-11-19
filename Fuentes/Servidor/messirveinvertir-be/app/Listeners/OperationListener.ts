import { EventsList } from '@ioc:Adonis/Core/Event'
import AssetStock from 'App/Models/AssetStock'
import Operation, { OperationType } from 'App/Models/Operation'

export default class OperationListener {
  public async onNew(operations: EventsList['new:operations']) {
    for (const operation of operations) {
      await this.handleOperation(operation)
    }
  }
  protected async handleOperation(operation: Operation) {
    const assetStock = await AssetStock.firstOrCreate(
      {
        assetId: operation.assetId,
        accountId: operation.accountId,
      },
      {
        avgUsdBuyPrice: operation.usdPrice / operation.quantity,
        quantity: operation.quantity,
      }
    )

    if (assetStock.$isLocal) {
      return
    }

    assetStock.quantity += this.getOperationQuantity(operation)
    assetStock.avgUsdBuyPrice = await this.getAvgUsdBuyPrice(assetStock, operation)
    await assetStock.save()
  }
  protected async getAvgUsdBuyPrice(
    assetStock: AssetStock,
    operation: { usdPrice: number; type: OperationType }
  ) {
    if (operation.type === OperationType.Buy) {
      await assetStock.load('account')
      return assetStock.account.getAvgUsdBuyPrice()
    }
    return assetStock.avgUsdBuyPrice
  }
  protected getOperationQuantity(operation: { quantity: number; type: OperationType }) {
    if ([OperationType.Sell, OperationType.Withdraw].includes(operation.type)) {
      return operation.quantity * -1
    }
    return operation.quantity
  }
}
