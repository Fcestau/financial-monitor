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

  public async getAlerts({ auth, request }) {
    const page = request.input('page',1)
    const limit = request.input('limit',10)
    const orderById = request.input('order_by_id')
    
    return await Alert.query()
      .whereHas('account', (builder) => builder.where('uid', auth.user!.uid))
      .orderBy('id', orderById)
      .paginate(page, limit)
  }

  public async deleteAlerts({ auth, request, response }) {
    const idDtos = request.input('alerts')
    const ids = idDtos.map((dto) => dto.id)

    await Alert.query()
      .whereHas('account', (builder) => builder.where('uid', auth.user!.uid))
      .whereIn('id', ids)
      .delete()

    return response.noContent()
  }
}
