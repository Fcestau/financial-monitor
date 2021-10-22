import test from 'japa'
import http from '../../../extend/http'
import { AccountsFactory } from 'Database/factories'
import Account from 'App/Models/Account'

test.group('API V1 IOL Operations', () => {
  test('[/api/v1/operations/updateOperations] (iolAccount): gathers and saves new operations', async (assert) => {
    // Arrange
    const account = await AccountsFactory.create()

    // Act
    await http
      .get('/api/v1/operations/updateOperations')
      .query({
        account: account
      })
      .asApiUser()
      .expect(200)

    // Assert
    assert.exists(body.data)
    assert.equal(dbAccounts[0].uid, body.data[0].uid)
    assert.equal(dbAccounts[1].uid, body.data[1].uid)
    assert.equal(dbAccounts[0].name, body.data[0].name)
    assert.equal(dbAccounts[1].name, body.data[1].name)
  })
})
