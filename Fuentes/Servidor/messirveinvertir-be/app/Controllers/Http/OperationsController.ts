import IOLService from '@ioc:messirve/IOLService'
import IolAdapter from 'App/Exchanges/IOL/Adapter/IolAdapter'
import Account, { AccountType } from 'App/Models/Account'
import { DateTime } from 'luxon'

export default class OperationsController {
  /**
   * @swagger
   * /api/v1/operations:
   *   get:
   *     tags:
   *       - Operations
   *     summary: Get operations.
   *     responses:
   *       200:
   *         description: Operations list
   */
  public async operations() {
    return IOLService.getOperations()
  }

  public async updateOperations(account: Account) {
    if (account.type == AccountType.IOL) {
      const filter = {
        from: account.lastOperationsUpdate,
        to: DateTime.utc().toJSDate()
      }
      account.lastOperationsUpdate = filter.to

      const newOperationsData = await IOLService.getOperations(filter)
      
      Operation.createMany(newOperationsData
        .map(async (operationData) => {
          numero: operationData.numero
          fechaOrden: operationData.fechaOrden
          tipo: operationData.tipo
          estado: operationData.estado
          mercado: operationData.mercado
          simbolo: operationData.simbolo
          cantidad: operationData.cantidad
          monto: operationData.monto
          modalidad: operationData.modalidad
          precio: operationData.precio
          fechaOperada: operationData.fechaOperada
          cantidadOperada: operationData.cantidadOperada
          precioOperado: operationData.precioOperado
          montoOperado: operationData.montoOperado
        }
      ))
    }
  }
}
