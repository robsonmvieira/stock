import { Entity } from '@modules/core/domain/entities'
import { ValueObject } from '@modules/core/domain/valueObject'
import { ProductId } from '../valueObject'
import { ProductStatus } from '../enum/product-status.enum'

type CreateProductCommand = {
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

  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

type ProductProps = {
  name: string
  description: string
  price: number
  stockQuantity: number
  supplierId: string
  sku: string
  images: string[]
  QuantityPurchased?: number
  unitPrice: number
  totalAmount?: number
  status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  categoryId: string

  id?: ProductId
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

export class Product extends Entity {
  private name: string
  private description: string
  private price: number
  private stockQuantity: number
  private supplierId: string
  private sku: string
  private images: string[]
  private QuantityPurchased?: number
  private unitPrice: number
  private totalAmount?: number
  private status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  private categoryId: string

  constructor({
    name,
    description,
    price,
    stockQuantity,
    supplierId,
    sku,
    images,
    QuantityPurchased,
    unitPrice,
    totalAmount,
    status,
    categoryId,
    id,
    is_blocked,
    created_at,
    updated_at,
    deleted_at,
    is_deleted
  }: ProductProps) {
    super(id, created_at, updated_at, is_deleted, is_blocked, deleted_at)
    this.name = name
    this.description = description
    this.price = price
    this.stockQuantity = stockQuantity
    this.supplierId = supplierId
    this.sku = sku
    this.images = images
    this.QuantityPurchased = QuantityPurchased ?? 0
    this.unitPrice = unitPrice
    this.totalAmount = totalAmount ?? 0
    this.status = status
    this.categoryId = categoryId
  }

  static create(command: CreateProductCommand) {
    const product = new Product({
      name: command.name,
      description: command.description,
      price: command.price,
      stockQuantity: command.stockQuantity,
      supplierId: command.supplierId,
      sku: command.sku,
      images: command.images,
      QuantityPurchased: command.QuantityPurchased,
      unitPrice: command.unitPrice,
      totalAmount: command.totalAmount,
      status: command.status,
      categoryId: command.categoryId
    })
    return product
  }

  get entity_id(): ValueObject {
    return this.id
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stockQuantity: this.stockQuantity,
      supplierId: this.supplierId,
      sku: this.sku,
      images: this.images,
      QuantityPurchased: this.QuantityPurchased,
      unitPrice: this.unitPrice,
      totalAmount: this.totalAmount,
      status: this.status,
      categoryId: this.categoryId
    }
  }
}
