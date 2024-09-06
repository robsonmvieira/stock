import { IDomainEventHandler } from '@modules/core/application/handlers'

import { ProductBlockedEvent } from '../../domain/events'
import { OnEvent } from '@nestjs/event-emitter'

export class ProductBlockedInQueueHandler implements IDomainEventHandler {
  @OnEvent(ProductBlockedEvent.name)
  async handle(domainEvent: ProductBlockedEvent): Promise<void> {
    console.log(`Product ${domainEvent.aggregateId} was blocked!`)
  }
}
