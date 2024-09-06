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
      console.log(eventName)
      event.markEventAsDispatched(domainEvent)
      await this.eventEmitter.emitAsync(eventName, domainEvent)
    }
  }
}
