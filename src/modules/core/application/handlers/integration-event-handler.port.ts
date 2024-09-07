import { IIntegrationEvent } from '@modules/core/domain/entities'

export interface IIntegrationEventHandler {
  handle(domainEvent: IIntegrationEvent): Promise<void>
}
