import { BeforeRemove, BeforeUpdate, Column } from 'typeorm'
import { UuidVO } from '../valueObject'
export abstract class Model {
  @Column({ primary: true })
  id: string

  @Column()
  created_at: Date

  @Column({ nullable: true })
  updated_at: Date

  @Column({ nullable: true, default: false })
  is_deleted: boolean

  @Column({ nullable: true, default: false })
  is_blocked: boolean

  @Column({ nullable: true })
  deleted_at: Date

  constructor(id?: string, created_at?: Date, updated_at?: Date) {
    this.id = id ?? UuidVO.create().id
    this.created_at = created_at ?? new Date()
    this.updated_at = updated_at ?? null
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updated_at = new Date()
  }

  @BeforeRemove()
  beforeDelete() {
    this.is_deleted = true
    this.deleted_at = new Date()
  }
}
