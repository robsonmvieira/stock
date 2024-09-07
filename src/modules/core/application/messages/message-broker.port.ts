import { IDomainEvent } from '@modules/core/domain/entities'

export interface IMessageBroker {
  publishEvent(message: IDomainEvent): Promise<void>
}
