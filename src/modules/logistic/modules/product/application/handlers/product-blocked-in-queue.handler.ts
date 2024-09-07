import { IIntegrationEventHandler } from '@modules/core/application/handlers'

import { ProductBlockedIntegrationEvent } from '../../domain/events'
import { OnEvent } from '@nestjs/event-emitter'
import { Inject } from '@nestjs/common'
import { IMessageBroker } from '@modules/core/application/messages'

export class ProductBlockedInQueueHandler implements IIntegrationEventHandler {
  @Inject('IMessageBroker')
  private readonly messageBroker: IMessageBroker
  @OnEvent(ProductBlockedIntegrationEvent.name)
  async handle(
    integrationEvent: ProductBlockedIntegrationEvent
  ): Promise<void> {
    await this.messageBroker.publishEvent(integrationEvent)
    console.log(`Product ${integrationEvent.data} was blocked!`)
  }
}
