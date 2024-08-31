import { Model } from 'src/modules/core/domain/entities'
import { Column, Entity } from 'typeorm'

export type JobPositionModelProps = {
  id?: string
  title: string
  description?: string
  created_at?: Date
  updated_at?: Date
  is_deleted?: boolean
  deleted_at?: Date
  is_blocked?: boolean
}
@Entity({ name: 'jobPosition' })
export class JobPositionModel extends Model {
  @Column()
  title: string

  @Column({ nullable: true })
  description?: string

  constructor(props: JobPositionModelProps) {
    super({
      id: props?.id,
      created_at: props?.created_at,
      updated_at: props?.updated_at,
      is_deleted: props?.is_deleted,
      deleted_at: props?.deleted_at,
      is_blocked: props?.is_blocked
    })
    this.title = props?.title
    this.description = props?.description
  }
}
