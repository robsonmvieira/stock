import { Entity } from '@modules/core/domain/entities'
import { ValueObject } from '@modules/core/domain/valueObject'
import { ProductId } from '../valueObject'
import { ProductStatus } from '../enum/product-status.enum'

type CreateProductCommand = {
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

type ProductProps = {
  name: string
  description: string
  price: string
  stockQuantity: number
  supplierId: string
  sku: string
  images: string[]
  QuantityPurchased?: number
  unitPrice: string
  totalAmount?: string
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
  private _price: string
  private _stockQuantity: number
  private _supplierId: string
  private _sku: string
  private _images: string[]
  private _quantityPurchased?: number
  private _unitPrice: string
  // final value after purchase in every sales
  private _totalAmount?: string
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
    this._quantityPurchased = QuantityPurchased ?? 0
    this._unitPrice = unitPrice
    this._totalAmount = totalAmount ?? '0'
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
    return this._name
  }

  get description(): string {
    return this._description
  }

  get price(): string {
    return this._price
  }

  get stockQuantity(): number {
    return this._stockQuantity
  }

  get supplierId(): string {
    return this._supplierId
  }

  get sku(): string {
    return this._sku
  }

  get images(): string[] {
    return this._images
  }

  get quantityPurchased(): number {
    return this._quantityPurchased
  }

  get unitPrice(): string {
    return this._unitPrice
  }

  get totalAmount(): string {
    return this._totalAmount
  }

  get status(): ProductStatus {
    return this._status
  }

  get categoryId(): string {
    return this._categoryId
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
      QuantityPurchased: this.quantityPurchased,
      unitPrice: this.unitPrice,
      totalAmount: this.totalAmount,
      status: this.status,
      categoryId: this.categoryId,

      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      is_deleted: this.is_deleted,
      is_blocked: this.is_blocked
    }
  }
}
