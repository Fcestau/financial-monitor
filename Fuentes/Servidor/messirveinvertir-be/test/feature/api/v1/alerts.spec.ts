import test from 'japa'
import http from '../../../extend/http'
import { AccountsFactory, AssetsFactory } from 'Database/factories'
import Alert, { AlertFrequency } from 'App/Models/Alert'

test.group('API V1 Alerts', () => {
  test('[/api/v1/auth/createAlerts] (valid): alerts are created and returns ids', async (assert) => {
    // Arrange
    const account = await AccountsFactory.create()
    const asset = await AssetsFactory.create()
    const alerts = [
      {
        account_id: account.id,
        asset_id: asset.id,
        frequency: AlertFrequency.Daily,
        hourly_delta_price: 0,
        hourly_delta_volume: 5,
      },
      {
        account_id: account.id,
        asset_id: asset.id,
        frequency: AlertFrequency.Unique,
        hourly_delta_price: 3,
        hourly_delta_volume: 6,
      },
    ]

    // Act
    const { body } = await http.post('/api/v1/alerts').asApiUser().send({ alerts }).expect(201)

    // Assert
    assert.exists(body.alerts)
    console.log(body)

    for (const alert of body.alerts) {
      const key = body.alerts.indexOf(alert)
      const data = await Alert.find(alert.id)
      assert.equal(alerts[key].account_id, data!.accountId)
      assert.equal(alerts[key].asset_id, data!.assetId)
      assert.equal(alerts[key].frequency, data!.frequency)
      assert.equal(alerts[key].hourly_delta_price, data!.hourlyDeltaPrice)
      assert.equal(alerts[key].hourly_delta_volume, data!.hourlyDeltaVolume)
    }
  })
})
