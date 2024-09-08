import { AggregateRoot } from '@modules/core/domain/entities'
import EventEmitter2 from 'eventemitter2'

export class DomainEventMediator {
  constructor(private eventEmitter: EventEmitter2) {}
  register(event: string, handler: any) {
    this.eventEmitter.on(event, handler)
  }

  async publish(event: AggregateRoot) {
    for (const domainEvent of event.events) {
      const eventName = domainEvent.constructor.name
      event.markEventAsDispatched(domainEvent)
      await this.eventEmitter.emitAsync(eventName, domainEvent)
    }
  }

  async publishIntegrationEvents(aggregate: AggregateRoot) {
    for (const domainEvent of aggregate.events) {
      const integrationEvent = domainEvent.getIntegrationEvent?.()
      if (!integrationEvent) continue
      await this.eventEmitter.emitAsync(
        integrationEvent.eventName,
        integrationEvent
      )
    }
  }
}
