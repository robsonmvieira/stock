import { Model } from '@modules/core/domain/entities'
import { Column, Entity } from 'typeorm'

export type CategoryModelProps = {
  name: string
  description?: string
  products?: string[]

  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

@Entity({ name: 'category' })
export class CategoryModel extends Model {
  @Column({ type: 'text', array: true, nullable: true })
  productsIds?: string[]

  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  constructor(props: CategoryModelProps) {
    super({
      id: props?.id,
      created_at: props?.created_at,
      updated_at: props?.updated_at,
      is_deleted: props?.is_deleted,
      deleted_at: props?.deleted_at,
      is_blocked: props?.is_blocked
    })
    this.name = props?.name
    this.description = props?.description
    this.productsIds = props?.products
  }
}
