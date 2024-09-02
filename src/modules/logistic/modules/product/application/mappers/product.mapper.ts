import { Product } from '../../domain/entities'
import { ProductModel } from '../../domain/models'
import { CreateProductDtoProps } from '../use-cases/product/create-product-use-case/dto'

export class ProductMapper {
  static fromDtoToEntity(dto: CreateProductDtoProps): Product {
    return Product.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      stockQuantity: dto.stockQuantity,
      supplierId: dto.supplierId,
      sku: dto.sku,
      images: dto.images,
      QuantityPurchased: dto.QuantityPurchased,
      unitPrice: dto.unitPrice,
      totalAmount: dto.totalAmount,
      status: dto.status,
      categoryId: dto.categoryId
    })
  }

  static fromEntityToModel(entity: Product): ProductModel {
    return new ProductModel({
      id: entity.id.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      stockQuantity: entity.stockQuantity,
      supplierId: entity.supplierId,
      sku: entity.sku,
      images: entity.images,
      QuantityPurchased: entity.QuantityPurchased,
      unitPrice: entity.unitPrice,
      totalAmount: entity.totalAmount,
      status: entity.status,
      categoryId: entity.categoryId
    })
  }
}
