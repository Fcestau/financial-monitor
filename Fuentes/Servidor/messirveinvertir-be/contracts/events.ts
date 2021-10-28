/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { OperationType } from "App/Models/Operation";

declare module '@ioc:Adonis/Core/Event' {
  interface EventsList {
    'new:operation': {
      id: number,
      accountId: number,
      assetId: number,
      usdPrice: number,
      quantity: number,
      type: OperationType
    }
  }
}
