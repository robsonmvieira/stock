import { Model } from '@modules/core/domain/entities'
import { Column, Entity } from 'typeorm'
export type ProductModelProps = {
  name: string
  description: string
  price: number
  stockQuantity: number
  supplierId: string
  sku: string
  imageUrl: string[]
  QuantityPurchased: number
  unitPrice: number
  totalAmount: number
  status: string // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  categoryId: string

  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

@Entity({ name: 'product' })
export class ProductModel extends Model {
  @Column({ type: 'uuid' })
  supplierId: string

  @Column()
  categoryId: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  stockQuantity: number

  @Column()
  sku: string

  @Column({ type: 'text', array: true })
  imageUrl: string[]

  @Column()
  QuantityPurchased: number

  @Column()
  unitPrice: number

  @Column()
  totalAmount: number

  @Column()
  status: string // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'

  constructor(props: ProductModelProps) {
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
    this.price = props?.price
    this.stockQuantity = props?.stockQuantity
    this.sku = props?.sku
    this.imageUrl = props?.imageUrl
    this.QuantityPurchased = props?.QuantityPurchased
    this.unitPrice = props?.unitPrice
    this.totalAmount = props?.totalAmount
    this.status = props?.status
    this.supplierId = props?.supplierId
    this.categoryId = props?.categoryId
  }
}
