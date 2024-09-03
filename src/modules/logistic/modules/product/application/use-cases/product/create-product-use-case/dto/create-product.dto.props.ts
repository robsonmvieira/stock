import { ProductStatus } from '@modules/logistic/modules/product/domain/enum/product-status.enum'

export type CreateProductDtoProps = {
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
  status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  categoryId: string
}
