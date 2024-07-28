import { ValueObject, UuidVO } from '../valueObject'
import { Notification } from './notification'

export abstract class Entity {
  id: UuidVO
  created_at: Date
  updated_at: Date | null
  notification: Notification
  is_deleted: boolean
  deleted_at: Date
  is_blocked: boolean

  constructor(id?: UuidVO, created_at?: Date, updated_at?: Date) {
    this.id = id ?? UuidVO.create()
    this.created_at = created_at ?? new Date()
    this.updated_at = updated_at ?? null
    this.notification = new Notification()
  }
  abstract get entity_id(): ValueObject
  abstract toJSON(): any
}
