import { Model } from '@modules/core/domain/entities'
import { Column, Entity } from 'typeorm'
import { ProductStatus } from '../enum/product-status.enum'
export type ProductModelProps = {
  // basic information
  sku: string
  name: string
  price: number
  details: string
  images: string[]
  supplierId: string
  categoryId: string
  description: string
  stockQuantity: number
  invoiceNumber: string
  blockedQuantity: number
  status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  ratings: number

  // business Logic
  unitPrice: number
  reviewsCount: number
  totalAmount?: number // total quantity sold over all time
  totalUnitsSold?: number
  totalSalesValue?: number
  discountedPrice?: number
  complaintsCount?: number
  blockForSaleQuantity?: number
  minimalInStockQuantityPermited?: number

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

  @Column({ type: 'text', array: true, default: [] })
  images?: string[]

  @Column()
  unitPrice: number

  @Column()
  totalAmount: number

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus

  @Column()
  invoiceNumber: string

  @Column()
  details: string

  @Column()
  blockedQuantity: number

  @Column()
  ratings: number

  // business Logic
  @Column()
  reviewsCount: number
  @Column({ nullable: true })
  totalUnitsSold?: number
  @Column({ nullable: true })
  totalSalesValue?: number
  @Column({ nullable: true })
  discountedPrice?: number
  @Column({ nullable: true })
  complaintsCount?: number
  @Column({ nullable: true })
  blockForSaleQuantity?: number
  @Column({ nullable: true })
  minimalInStockQuantityPermited?: number

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
    this.unitPrice = props?.unitPrice
    this.totalAmount = props?.totalAmount
    this.status = props?.status
    this.supplierId = props?.supplierId
    this.categoryId = props?.categoryId
    this.invoiceNumber = props?.invoiceNumber
    this.blockedQuantity = props?.blockedQuantity
    this.ratings = props?.ratings
    this.reviewsCount = props?.reviewsCount
    this.totalUnitsSold = props?.totalUnitsSold
    this.totalSalesValue = props?.totalSalesValue
    this.discountedPrice = props?.discountedPrice
    this.complaintsCount = props?.complaintsCount
    this.blockForSaleQuantity = props?.blockForSaleQuantity
    this.minimalInStockQuantityPermited = props?.minimalInStockQuantityPermited
    this.details = props?.details
  }
}
