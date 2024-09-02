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
  private _name: string
  private _description: string
  private _price: number
  private _stockQuantity: number
  private _supplierId: string
  private _sku: string
  private _images: string[]
  private _QuantityPurchased?: number
  private _unitPrice: number
  private _totalAmount?: number
  private _status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  private _categoryId: string

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
    this._name = name
    this._description = description
    this._price = price
    this._stockQuantity = stockQuantity
    this._supplierId = supplierId
    this._sku = sku
    this._images = images
    this._QuantityPurchased = QuantityPurchased ?? 0
    this._unitPrice = unitPrice
    this._totalAmount = totalAmount ?? 0
    this._status = status
    this._categoryId = categoryId
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

  get name(): string {
    return this.name
  }

  get description(): string {
    return this.description
  }

  get price(): number {
    return this.price
  }

  get stockQuantity(): number {
    return this.stockQuantity
  }

  get supplierId(): string {
    return this.supplierId
  }

  get sku(): string {
    return this.sku
  }

  get images(): string[] {
    return this.images
  }

  get QuantityPurchased(): number {
    return this.QuantityPurchased
  }

  get unitPrice(): number {
    return this.unitPrice
  }

  get totalAmount(): number {
    return this.totalAmount
  }

  get status(): ProductStatus {
    return this.status
  }

  get categoryId(): string {
    return this.categoryId
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
