import { Model } from '@modules/core/domain/entities'
import { Column, Entity } from 'typeorm'
export type ProductModelProps = {
  name: string
  description: string
  price: string
  stockQuantity: number
  supplierId: string
  sku: string
  images: string[]
  QuantityPurchased: number
  unitPrice: string
  totalAmount: string
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
  price: string

  @Column()
  stockQuantity: number

  @Column()
  sku: string

  @Column({ type: 'text', array: true, default: [] })
  images?: string[]

  @Column()
  QuantityPurchased: number

  @Column()
  unitPrice: string

  @Column()
  totalAmount: string

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
    this.images = props?.images
    this.QuantityPurchased = props?.QuantityPurchased
    this.unitPrice = props?.unitPrice
    this.totalAmount = props?.totalAmount
    this.status = props?.status
    this.supplierId = props?.supplierId
    this.categoryId = props?.categoryId
  }
}
