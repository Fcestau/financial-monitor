import CreateAlertsValidator from 'App/Validators/CreateAlertsValidator'
import Alert from 'App/Models/Alert'

export default class AlertsController {
  public async createAlerts({ request, response }) {
    const data = await request.validate(CreateAlertsValidator)

    const createdAlerts = await Promise.all(
      data.alerts.map(async (data) => {
        let newAlert = await Alert.create(data)
        return { id: newAlert.id }
      })
    )

    return response.created({ alerts: createdAlerts })
  }
}
