import { Entity } from '@modules/core/domain/entities'
import { ValueObject } from '@modules/core/domain/valueObject'
import { JobPositionId } from '../valueObject/job-position.uuid'

export type JobPositionCommand = {
  title: string
  description?: string
}

export type JobPositionProps = {
  id?: JobPositionId
  created_at?: Date
  updated_at?: Date
  title: string
  description?: string
}

export class JobPosition extends Entity {
  job_position_id: JobPositionId
  title: string
  description?: string

  constructor({
    id,
    created_at,
    updated_at,
    title,
    description
  }: JobPositionProps) {
    super(id, created_at, updated_at)

    this.title = title
    this.description = description
  }

  static create(command: JobPositionCommand) {
    const job_position = new JobPosition({
      title: command.title,
      description: command.description
    })
    return job_position
  }
  get entity_id(): ValueObject {
    return this.job_position_id
  }
  toJSON() {
    return {
      job_position_id: this.job_position_id.id,
      title: this.title,
      description: this.description
    }
  }
}
