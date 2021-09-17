import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('API Ping', () => {
  test('[/ping] (get): response is "pong"', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/ping').expect(200)

    assert.equal(text, 'pong')
  })
})
