import IOLService from '@ioc:messirve/IOLService'

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
}
