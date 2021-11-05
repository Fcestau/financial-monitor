import Event from '@ioc:Adonis/Core/Event'

Event.on('new:operation', 'Operation.onNew')