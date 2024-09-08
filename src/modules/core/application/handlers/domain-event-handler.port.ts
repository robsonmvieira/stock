import { IDomainEvent } from '@modules/core/domain/entities'

export interface IDomainEventHandler {
  handle(domainEvent: IDomainEvent): Promise<void>
}
