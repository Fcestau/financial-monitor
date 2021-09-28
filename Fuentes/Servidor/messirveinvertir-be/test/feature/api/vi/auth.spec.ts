import test from 'japa'
import http from '../../../extend/http'

test.group('API V1 Auth', () => {
  test('[/api/v1/auth/login] (valid): user can login', async (assert) => {
    const { body } = await http
      .post('/api/v1/auth/login')
      .send({
        email: 'example@example.com',
        password: '12345678',
      })
      .expect(200)

    assert.isDefined(body.token)
  })
  test('[/api/v1/auth/login] (invalid): user can not login', async (assert) => {
    const { body } = await http
      .post('/api/v1/auth/login')
      .send({
        email: 'example@example.com',
        password: 'wrong',
      })
      .expect(400)

    assert.isUndefined(body.token)
  })
  test('[/api/v1/auth/user] (authenticated): get user information', async (assert) => {
    const { body } = await http.get('/api/v1/auth/user').asApiUser().expect(200)

    assert.isDefined(body.uid)
  })
  test('[/api/v1/auth/logout] (authenticated): token is destroyed', async (assert) => {
    let loginResponse = await http
      .post('/api/v1/auth/login')
      .send({
        email: 'example@example.com',
        password: '12345678',
      })
      .expect(200)

    await http.get('/api/v1/auth/logout').asApiUser(loginResponse.body.token).expect(204)

    const { body } = await http
      .get('/api/v1/auth/user')
      .asApiUser(loginResponse.body.token)
      .expect(401)

    assert.isUndefined(body.uid)
  })
})
