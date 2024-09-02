import { Model } from '@modules/core/domain/entities'
import { Column, Entity } from 'typeorm'
import { CreateSupplierAddressCommandType } from '../valueObjects'

export type SupplierModelProps = {
  name: string
  email: string
  phone: string
  lastName: string
  document: string
  isActive: boolean
  products: string[]
  addresses: CreateSupplierAddressCommandType[]

  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}
@Entity({ name: 'supplier' })
export class SupplierModel extends Model {
  @Column('text', { array: true })
  products?: string[]

  @Column()
  name: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  document: string

  @Column({ type: 'boolean', default: true })
  isActive?: boolean

  @Column({ type: 'json', nullable: true })
  addresses?: CreateSupplierAddressCommandType[]

  constructor(props: SupplierModelProps) {
    super({
      id: props?.id,
      created_at: props?.created_at,
      updated_at: props?.updated_at,
      is_deleted: props?.is_deleted,
      deleted_at: props?.deleted_at,
      is_blocked: props?.is_blocked
    })
    this.name = props?.name
    this.lastName = props?.lastName
    this.email = props?.email
    this.phone = props?.phone
    this.document = props?.document
    this.isActive = props?.isActive
    this.addresses = props?.addresses
    this.products = props?.products
  }
}
