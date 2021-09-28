const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const request = require('supertest')

request.Test.prototype.asApiUser = function (token) {
  return this.auth(token || 'Nw.9JAl6B9jGFR4eNSpXMl3MPWl-jDTgdoI7gSuLvZ4e9woTQucmspBw7frKaQr', {
    type: 'bearer',
  })
}

export = request(BASE_URL)
