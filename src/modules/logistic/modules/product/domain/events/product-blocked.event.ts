import { IDomainEvent } from '@modules/core/domain/entities'
import { UuidVO } from '@modules/core/domain/valueObject'

export class ProductBlockedEvent implements IDomainEvent {
  aggregateId: UuidVO
  aggregateName: string
  aggregateVersion: number
  createdAt: Date
  createdBy: string
  data: any
  constructor(
    aggregateId: UuidVO,
    aggregateName: string,
    aggregateVersion: number,
    createdBy: string,
    data: any
  ) {
    this.aggregateId = aggregateId
    this.aggregateName = aggregateName
    this.aggregateVersion = aggregateVersion
    this.createdAt = new Date()
    this.createdBy = createdBy
    this.data = data
  }
}
