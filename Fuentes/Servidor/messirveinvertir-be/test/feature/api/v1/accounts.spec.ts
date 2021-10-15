import test from 'japa'
import http from '../../../extend/http'
import { AccountsFactory } from 'Database/factories'
import Account from 'App/Models/Account'

test.group('API V1 Accounts', () => {
  test('[/api/v1/accounts/listAccounts] (valid): returns accounts list', async (assert) => {
    // Arrange
    const dbAccounts = await AccountsFactory.createMany(2)

    // Act
    const { body } = await http
      .get('/api/v1/accounts')
      .asApiUser()
      .expect(200)

    // Assert
    assert.exists(body.data)
    assert.equal(dbAccounts[0].uid, body.data[0].uid)
    assert.equal(dbAccounts[1].uid, body.data[1].uid)
    assert.equal(dbAccounts[0].name, body.data[0].name)
    assert.equal(dbAccounts[1].name, body.data[1].name)
  })
  test('[/api/v1/accounts/listAccounts] (ascendingOrder): returns ordered accounts list', async (assert) => {
    // Arrange
    await AccountsFactory.createMany(2)

    // Act
    const { body } = await http
      .get('/api/v1/accounts')
      .query({
        orderById: 'asc'
      })
      .asApiUser()
      .expect(200)

    // Assert
    assert.exists(body.data)
    assert.isTrue(body.data[0].id < body.data[1].id)
  })
  test('[/api/v1/accounts/listAccounts] (descendingOrder): returns ordered accounts list', async (assert) => {
    // Arrange
    await AccountsFactory.createMany(2)

    // Act
    const { body } = await http
      .get('/api/v1/accounts')
      .query({
        orderById: 'desc'
      })
      .asApiUser()
      .expect(200)

    // Assert
    assert.exists(body.data)
    assert.isTrue(body.data[0].id > body.data[1].id)
  })
  test('[/api/v1/auth/createAccounts] (valid): accounts are created and returns ids', async (assert) => {
    // Act
    const { body } = await http
      .post('/api/v1/accounts')
      .asApiUser()
      .send({
        accounts: [
        {
            name: 'IOLAccount',
            type: 'IOL'
        },
        {
            name: 'ManualAccount',
            type: 'Manual'
        }
      ]})
      .expect(201)

    // Assert
    assert.exists(body.accounts)

    const firstRow = await Account.find(body.accounts[0].id)
    const secondRow = await Account.find(body.accounts[1].id)

    assert.equal('IOLAccount', firstRow!.name)
    assert.equal('ManualAccount', secondRow!.name)
  })
  test('[/api/v1/auth/deleteAccounts] (valid): accounts are deleted', async (assert) => {
    // Arrange
    const dbAccounts = await AccountsFactory.createMany(3)
    
    // Act
    await http
      .delete('/api/v1/accounts')
      .asApiUser()
      .send({ accounts: dbAccounts })
      .expect(204)
    
    // Assert
    dbAccounts.forEach(async (account) => {
      assert.isNull(await Account.find(account.id))
    });
  })
})
