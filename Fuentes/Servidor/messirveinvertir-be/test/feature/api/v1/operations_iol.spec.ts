import test from 'japa'
import http from '../../../extend/http'
import { AccountsFactory } from 'Database/factories'

test.group('API V1 IOL Operations', () => {
  test('[/api/v1/operations/updateOperations] (iolAccount): gathers and saves new operations', async (assert) => {
    // Arrange
    await AccountsFactory.create()

    // Act
    await http
      .get('/api/v1/operations/updateOperations')
      .asApiUser()
      .expect(204)

    // Assert
    
    //ToDo: mock IOL api to get new operations
    assert.isTrue(true)
  })
})
