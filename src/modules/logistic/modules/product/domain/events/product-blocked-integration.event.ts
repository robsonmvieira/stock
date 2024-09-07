import { IIntegrationEvent } from '@modules/core/domain/entities'

export class ProductBlockedIntegrationEvent implements IIntegrationEvent {
  data: any
  createdAt: Date
  createdBy: string
  eventName: string
  eventVersion: number

  constructor({
    data,
    createdBy,
    eventName
  }: {
    data: any
    createdBy: string
    eventName: string
  }) {
    this.data = data
    this.createdAt = new Date()
    this.createdBy = createdBy
    this.eventName = eventName
    this.eventVersion = 1
  }
}
