import { UuidVO } from '../valueObject'

export interface IDomainEvent {
  aggregateId: UuidVO
  aggregateName: string
  aggregateVersion: number
  createdAt: Date
  createdBy: string
}
