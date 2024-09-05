import { ProductStatus } from '@modules/logistic/modules/product/domain/enum/product-status.enum'

export type CreateProductDtoProps = {
  // basic information
  name: string
  price: number
  details?: string
  images?: string[]
  invoiceNumber: string
  categoryId: string
  supplierId: string
  description: string
  status: ProductStatus
  stockQuantity: number
}
