import { Product } from '../../domain/entities'
import { ProductModel } from '../../domain/models'
import { ProductId } from '../../domain/valueObject'
import { CreateProductDtoProps } from '../use-cases/product/create-product-use-case/dto'

export class ProductMapper {
  static fromDtoToEntity(dto: CreateProductDtoProps): Product {
    return Product.create({
      name: dto.name,
      invoiceNumber: dto.invoiceNumber,
      description: dto.description,
      price: dto.price,
      stockQuantity: dto.stockQuantity,
      supplierId: dto.supplierId,
      images: dto.images,
      status: dto.status,
      categoryId: dto.categoryId
    })
  }

  static fromModelToEntity(model: ProductModel): Product {
    return new Product({
      id: new ProductId(model.id),
      name: model.name,
      description: model.description,
      price: model.price,
      stockQuantity: model.stockQuantity,
      supplierId: model.supplierId,
      sku: model.sku,
      images: model.images,
      details: model.details,
      discountedPrice: model.discountedPrice,
      blockedQuantity: model.blockedQuantity,
      minimalInStockQuantityPermited: model.minimalInStockQuantityPermited,
      ratings: model.ratings,
      reviewsCount: model.reviewsCount,
      totalUnitsSold: model.totalUnitsSold,
      totalSalesValue: model.totalSalesValue,
      complaintsCount: model.complaintsCount,
      invoiceNumber: model.invoiceNumber,
      unitPrice: model.unitPrice,
      totalAmount: model.totalAmount,
      status: model.status,
      categoryId: model.categoryId,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
      is_deleted: model.is_deleted,
      is_blocked: model.is_blocked
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
      details: entity.details,
      discountedPrice: entity.discountedPrice,
      blockForSaleQuantity: entity.blockedQuantity,
      minimalInStockQuantityPermited: entity.minimalInStockQuantityPermited,
      ratings: entity.ratings,
      reviewsCount: entity.reviewsCount,
      totalUnitsSold: entity.totalUnitsSold,
      totalSalesValue: entity.totalSalesValue,
      complaintsCount: entity.complaintsCount,
      invoiceNumber: entity.invoiceNumber,
      blockedQuantity: entity.blockedQuantity,
      unitPrice: entity.unitPrice,
      totalAmount: entity.totalAmount,
      status: entity.status,
      categoryId: entity.categoryId
    })
  }
}
