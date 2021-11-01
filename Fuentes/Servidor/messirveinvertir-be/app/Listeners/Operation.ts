import { EventsList } from '@ioc:Adonis/Core/Event'
import AssetStock from 'App/Models/AssetStock'
import { OperationType } from 'App/Models/Operation'

export default class Operation {
    public async onNew(operation: EventsList['new:operation']) {
        const assetStock = await AssetStock.firstOrCreate({
            assetId: operation.assetId,
            accountId: operation.accountId,
        }, {
            avgUsdBuyPrice: operation.usdPrice,
            quantity: operation.quantity
        })

        if (assetStock.$isLocal) {
            return
        }

        assetStock.quantity += this.getOperationQuantity(operation)
        assetStock.avgUsdBuyPrice = this.getAvgUsdBuyPrice(assetStock, operation)
        assetStock.save()
    }
    getAvgUsdBuyPrice(assetStock: AssetStock, operation: { usdPrice: number; type: OperationType }) {
        if (operation.type === OperationType.Buy) {
            //TODO get new AVG buy price
            //Take into account when the stock is 0
            return operation.usdPrice
        }
        return assetStock.avgUsdBuyPrice
    }
    getOperationQuantity(operation: { quantity: number; type: OperationType }) {
        if ([OperationType.Sell, OperationType.Withdraw].includes(operation.type)) {
            return (operation.quantity * -1)
        }
        return operation.quantity
    }
}
