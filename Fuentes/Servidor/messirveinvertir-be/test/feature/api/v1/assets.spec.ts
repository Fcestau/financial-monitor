import test from 'japa'
import http from '../../../extend/http'
import { AccountsFactory, AssetsFactory } from 'Database/factories'

test.group('API V1 Accounts', () => {
  test('[/api/v1/assets/stock] (valid): returns assets stock list', async (assert) => {
    // Arrange
    const dbAsset = await AssetsFactory.create()
    await AccountsFactory.with('operations', 3, (op) => op.merge({ assetId: dbAsset.id })).create()

    // Act
    const { body } = await http.get('/api/v1/assets/stock').asApiUser().expect(200)

    // Assert
    assert.exists(body.data)
  })
})
