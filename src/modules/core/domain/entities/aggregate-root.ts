import { IDomainEvent } from './'
import { Entity } from './entity'
import EventEmitter2 from 'eventemitter2'

export abstract class AggregateRoot extends Entity {
  events: Set<IDomainEvent> = new Set<IDomainEvent>()
  localMediator = new EventEmitter2()
  applyEvent(event: IDomainEvent): void {
    this.events.add(event)
    this.localMediator.emit(event.constructor.name, event)
  }

  registerHandlers(event, handler: (event: IDomainEvent) => void): void {
    this.localMediator.on(event, handler)
  }
}
