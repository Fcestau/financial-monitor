import 'reflect-metadata'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'
import execa from 'execa'

process.env.HOST = process.env.HOST || '127.0.0.1'
process.env.NODE_ENV = 'testing'
process.env.PG_DB_NAME = 'test'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function runMigrations() {
  const Database = require('@ioc:Adonis/Lucid/Database')
  await Database.rawQuery(`DROP SCHEMA public CASCADE`)
  await Database.rawQuery(`CREATE SCHEMA public`)
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

async function seedApiToken() {
  const Database = require('@ioc:Adonis/Lucid/Database')
  // Nw.9JAl6B9jGFR4eNSpXMl3MPWl-jDTgdoI7gSuLvZ4e9woTQucmspBw7frKaQr
  await Database.insertQuery().table('api_tokens').insert({
    id: 7,
    user_uid: 'canawdljkncwjncwjnwcjwcnwjcnjwn',
    name: 'Opaque Access Token',
    type: 'api',
    token: 'f5982cf02fe2076d7e4cfcffbba1af3729aa757135cd58a83f7d42f607a1388a',
    created_at: '2021-09-19 18:20:24.509-03',
  })
}

/**
 * Configure test runner
 */
configure({
  files: ['test/**/*.spec.ts'],
  before: [startHttpServer, runMigrations, seedApiToken],
})
