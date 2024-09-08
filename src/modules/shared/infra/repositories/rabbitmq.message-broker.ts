import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { IMessageBroker } from '@modules/core/application/messages'
import { IIntegrationEvent } from '@modules/core/domain/entities'
import { EVENTS_CONFIG } from './'

export class RabbitMQMessageBroker implements IMessageBroker {
  constructor(private coon: AmqpConnection) {}
  async publishEvent(message: IIntegrationEvent): Promise<void> {
    const { exchange, routing_key } = EVENTS_CONFIG[message.constructor.name]
    await this.coon.publish(exchange, routing_key, message)
  }
}
