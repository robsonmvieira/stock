type ProductOutputProps = {
  id: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
  name: string
  invoiceNumber: string
  description: string
  details: string
  price: number
  stockQuantity: number
  blockedQuantity: number
  supplierId: string
  sku: string
  images?: string[]
  discountedPrice?: number
  unitPrice: number
  totalAmount?: number
  status: string // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  categoryId: string
  ratings: number
  reviewsCount: number
  totalSalesValue?: number
  totalUnitsSold?: number
  complaintsCount?: number
  blockForSaleQuantity?: number
  minimalInStockQuantityPermited?: number
}

export class ProductOutput {
  id: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
  name: string
  invoiceNumber: string
  description: string
  details: string
  price: number
  stockQuantity: number
  blockedQuantity: number
  supplierId: string
  sku: string
  images: string[]
  discountedPrice?: number
  unitPrice: number
  totalAmount?: number
  status: string // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  categoryId: string
  ratings: number
  reviewsCount: number
  totalSalesValue?: number
  totalUnitsSold?: number
  complaintsCount?: number
  blockForSaleQuantity?: number
  minimalInStockQuantityPermited?: number

  constructor(props: ProductOutputProps) {
    Object.assign(this, props)
  }
}
