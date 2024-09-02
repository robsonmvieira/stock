import { ProductStatus } from '@modules/logistic/modules/product/domain/enum/product-status.enum'

export type CreateProductDtoProps = {
  name: string
  description: string
  price: number
  stockQuantity: number
  supplierId: string
  sku: string
  images: string[]
  QuantityPurchased: number
  unitPrice: number
  totalAmount: number
  status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  categoryId: string
}
