import { AggregateRoot } from '@modules/core/domain/entities'
import { ValueObject } from '@modules/core/domain/valueObject'
import { ProductId } from '../valueObject'
import { ProductStatus } from '../enum/product-status.enum'
import { NewProductCreatedEvent, ProductBlockedEvent } from '../events'
import { ProductFakeBuilder } from '../tests'

type CreateProductCommand = {
  // basic information
  name: string
  price: number
  details?: string
  images?: string[]
  invoiceNumber: string
  categoryId: string
  supplierId: string
  description: string
  status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'

  // business information
  stockQuantity: number
}

type ProductProps = {
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

  // parent information
  id?: ProductId
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

export class Product extends AggregateRoot {
  private _name: string
  private _invoiceNumber: string
  private _description: string
  private _details: string
  private _price: number
  private _stockQuantity: number
  private _blockedQuantity: number
  private _supplierId: string
  private _sku: string
  private _images: string[]
  private _discountedPrice?: number
  private _unitPrice: number
  private _totalAmount?: number
  private _status: ProductStatus // 'active' | 'inactive' | 'deleted' | 'blocked' | 'onHold'
  private _categoryId: string
  private _ratings: number
  private _reviewsCount: number
  private _totalSalesValue?: number
  private _totalUnitsSold?: number
  private _complaintsCount?: number
  private _blockForSaleQuantity?: number
  private _minimalInStockQuantityPermited?: number

  constructor({
    name,
    description,
    details,
    price,
    stockQuantity,
    blockedQuantity,
    supplierId,
    sku,
    images,
    discountedPrice,
    unitPrice,
    totalAmount,
    status,
    categoryId,
    ratings,
    reviewsCount,
    totalSalesValue,
    totalUnitsSold,
    complaintsCount,
    minimalInStockQuantityPermited,
    invoiceNumber,
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
    this._details = details
    this._price = price
    this._stockQuantity = stockQuantity
    this._blockedQuantity = blockedQuantity
    this._supplierId = supplierId
    this._sku = sku
    this._images = images
    this._discountedPrice = discountedPrice
    this._unitPrice = unitPrice
    this._totalAmount = totalAmount ?? 0
    this._status = status
    this._categoryId = categoryId
    this._ratings = ratings
    this._reviewsCount = reviewsCount
    this._totalSalesValue = totalSalesValue
    this._totalUnitsSold = totalUnitsSold
    this._complaintsCount = complaintsCount
    this._minimalInStockQuantityPermited = minimalInStockQuantityPermited ?? 10
    this._invoiceNumber = invoiceNumber

    this.registerHandlers(Product.name, this.productCreated.bind(this))
    this.registerHandlers(Product.name, this.blockProduct.bind(this))
  }

  static create(command: CreateProductCommand) {
    const product = new Product({
      invoiceNumber: command.invoiceNumber,
      name: command.name,
      description: command.description,
      details: command.details,
      price: command.price,
      stockQuantity: command.stockQuantity,
      blockedQuantity: 0,
      supplierId: command.supplierId,
      sku: new ProductId().toString(),
      images: command.images,
      discountedPrice: 0,
      unitPrice: 0,
      totalAmount: 0,
      status: command.status,
      categoryId: command.categoryId,
      ratings: 0,
      reviewsCount: 0,
      totalSalesValue: 0,
      totalUnitsSold: 0,
      complaintsCount: 0
    })
    return product
  }

  productCreated(userLoggedId: string): void {
    this.applyEvent(
      new NewProductCreatedEvent(this.id, Product.name, 1, userLoggedId, {
        id: this.id.toString(),
        name: this._name,
        createdAt: new Date()
        // demais campos
      })
    )
  }

  static fake() {
    return ProductFakeBuilder
  }

  blockProduct(userLoggedId: string): void {
    this.is_blocked = true
    this.applyEvent(
      new ProductBlockedEvent(this.id, Product.name, 1, userLoggedId, {
        id: this.id.toString()
      })
    )
  }

  // Method to update stock quantity
  updateStockQuantity(newQuantity: number): void {
    this._stockQuantity = newQuantity
    // if stock less than
  }

  // Method to update blocked stock quantity
  updateBlockedQuantity(newQuantity: number): void {
    this._blockedQuantity = newQuantity
    // this._updatedAt = new Date()
  }

  // Method to add a sale and update sales metrics
  recordSale(quantitySold: number, saleAmount: number): void {
    this._stockQuantity -= quantitySold
    this._totalAmount = (this._totalAmount ?? 0) + saleAmount
    this._totalUnitsSold = (this._totalUnitsSold ?? 0) + quantitySold
    this._totalSalesValue = (this._totalSalesValue ?? 0) + saleAmount
    // this._updatedAt = new Date()
  }

  // Method to add a new review and update the average rating
  addReview(rating: number): void {
    this._ratings =
      (this._ratings * this._reviewsCount + rating) / (this._reviewsCount + 1)
    this._reviewsCount++
    // this._updatedAt = new Date()
  }

  // Method to handle complaints
  registerComplaint(): void {
    this._complaintsCount = (this._complaintsCount ?? 0) + 1
    // this._updatedAt = new Date()
  }

  get minimalInStockQuantityPermited(): number {
    return this._minimalInStockQuantityPermited
  }

  get blockForSaleQuantity(): number | undefined {
    return this._blockForSaleQuantity
  }

  get invoiceNumber(): string {
    return this._invoiceNumber
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

  get details(): string {
    return this._details
  }

  get price(): number {
    return this._price
  }

  get stockQuantity(): number {
    return this._stockQuantity
  }

  get blockedQuantity(): number {
    return this._blockedQuantity
  }

  get availableStock(): number {
    return this._stockQuantity - this._blockedQuantity
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

  get discountedPrice(): number | undefined {
    return this._discountedPrice
  }

  get unitPrice(): number {
    return this._unitPrice
  }

  get totalAmount(): number | undefined {
    return this._totalAmount
  }

  get status(): ProductStatus {
    return this._status
  }

  get categoryId(): string {
    return this._categoryId
  }

  get ratings(): number {
    return this._ratings
  }

  get reviewsCount(): number {
    return this._reviewsCount
  }

  get totalSalesValue(): number | undefined {
    return this._totalSalesValue
  }

  get totalUnitsSold(): number | undefined {
    return this._totalUnitsSold
  }

  get complaintsCount(): number | undefined {
    return this._complaintsCount
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      details: this.details,
      price: this.price,
      stockQuantity: this.stockQuantity,
      blockedQuantity: this.blockedQuantity,
      availableStock: this.availableStock,
      supplierId: this.supplierId,
      sku: this.sku,
      images: this.images,
      discountedPrice: this.discountedPrice,
      unitPrice: this.unitPrice,
      totalAmount: this.totalAmount,
      status: this.status,
      categoryId: this.categoryId,
      ratings: this.ratings,
      reviewsCount: this.reviewsCount,
      totalSalesValue: this.totalSalesValue,
      totalUnitsSold: this.totalUnitsSold,
      complaintsCount: this.complaintsCount,

      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
      is_deleted: this.is_deleted,
      is_blocked: this.is_blocked
    }
  }
}
