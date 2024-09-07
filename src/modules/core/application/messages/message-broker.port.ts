import { IIntegrationEvent } from '@modules/core/domain/entities'

export interface IMessageBroker {
  publishEvent(message: IIntegrationEvent): Promise<void>
}
