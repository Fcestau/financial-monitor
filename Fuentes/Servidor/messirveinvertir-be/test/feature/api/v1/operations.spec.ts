import test from 'japa'
import http from '../../../extend/http'
import { AccountsFactory, AssetsFactory } from 'Database/factories'
import Operation, { OperationType } from 'App/Models/Operation'

test.group('API V1 Accounts', () => {
  test('[/api/v1/auth/createOperations] (valid): operations are created and returns ids', async (assert) => {
    // Arrange
    const account = await AccountsFactory.create()
    const asset = await AssetsFactory.create()
    const operations = [
      {
        account_id: account.id,
        asset_id: asset.id,
        quantity: 10.3,
        usd_price: 1003.65,
        type: OperationType.Buy,
        timestamp: '2021-10-10T01:15:00.000-03:00',
      },
      {
        account_id: account.id,
        asset_id: asset.id,
        quantity: 5,
        usd_price: 5056.3,
        type: OperationType.Sell,
        timestamp: '2021-10-20T01:15:00.000-03:00',
      },
    ]

    // Act
    const { body } = await http
      .post('/api/v1/operations')
      .asApiUser()
      .send({ operations })
      .expect(201)

    // Assert
    assert.exists(body.operations)

    for (const operation of body.operations) {
      const key = body.operations.indexOf(operation)
      const data = await Operation.find(operation.id)
      assert.equal(operations[key].account_id, data!.accountId)
      assert.equal(operations[key].asset_id, data!.assetId)
      assert.equal(operations[key].quantity, data!.quantity)
      assert.equal(operations[key].usd_price, data!.usdPrice)
      assert.equal(operations[key].type, data!.type)
      assert.equal(operations[key].timestamp, data!.timestamp.toISO())
    }
  })
  test('[/api/v1/accounts/listOperations] (valid): returns operations list', async (assert) => {
    // Arrange
    const dbAsset = await AssetsFactory.create()
    await AccountsFactory.with('operations', 3, (op) => op.merge({ assetId: dbAsset.id })).create()

    // Act
    const { body } = await http.get('/api/v1/operations').asApiUser().expect(200)

    // Assert
    assert.exists(body.data)
  })
  test('[/api/v1/auth/deleteOperations] (valid): operations are deleted', async (assert) => {
    // Arrange
    const dbAsset = await AssetsFactory.create()
    const dbAccounts = await AccountsFactory.with('operations', 3, (op) =>
      op.merge({ assetId: dbAsset.id })
    ).create()
    const dbOperations = dbAccounts.operations

    // Act
    await http
      .delete('/api/v1/operations')
      .asApiUser()
      .send({ operations: dbOperations })
      .expect(204)

    // Assert
    for (let operation of dbOperations) {
      assert.isNull(await Operation.find(operation.id))
    }
  })
})
