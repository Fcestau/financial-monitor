import superagent from 'supertest'

declare module 'supertest' {
  interface Test extends superagent.Test {
    asApiUser(token: string | null): this
  }
}
