import { Chance } from 'chance'
import { ProductId } from '../valueObject'
import { ProductStatus } from '../enum/product-status.enum'
import { Product } from '../entities'
type PropertyOrFactory<T> = T | ((index: number) => T)

export class ProductFakeBuilder<TBuild = any> {
  private countsObjs: number
  private chance: Chance.Chance

  private constructor(counts: number = 1) {
    this.countsObjs = counts
    this.chance = new Chance()
  }

  private _id: PropertyOrFactory<ProductId> | undefined = undefined
  private _categoryIds: string[] | undefined = undefined
  private _supplierIds: string[] | undefined = undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _name: PropertyOrFactory<string> | undefined = _index =>
    this.nameGenerate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _invoiceNumber: PropertyOrFactory<string> | undefined = _index =>
    this.chance.word({ length: 10 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _description: PropertyOrFactory<string> | undefined = _index =>
    this.chance.paragraph({
      sentences: this.chance.integer({ min: 1, max: 10 })
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _details: PropertyOrFactory<string> | undefined = _index =>
    this.chance.paragraph({
      sentences: this.chance.integer({ min: 1, max: 5 })
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _price: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 1000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _stockQuantity: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 1000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _blockedQuantity: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 1000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _supplierId: PropertyOrFactory<string> | undefined = _index =>
    this.chance.guid({ version: 4 })

  private _categoryId: PropertyOrFactory<string> | undefined =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index => this.chance.guid({ version: 4 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _sku: PropertyOrFactory<string> | undefined = _index =>
    this.chance.guid({ version: 4 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _images: PropertyOrFactory<string[]> | undefined = _index => {
    const length = this.chance.integer({ min: 1, max: 5 })
    return Array.from({ length }, () => this.chance.url())
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _discountedPrice: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 10 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _unitPrice: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 10000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _totalAmount: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 100000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _status: PropertyOrFactory<ProductStatus> | undefined = _index =>
    this.chance.pickone([
      ProductStatus.ACTIVE,
      ProductStatus.INACTIVE,
      ProductStatus.DELETED,
      ProductStatus.BLOCKED,
      ProductStatus.ONHOLD
    ])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _ratings: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 5 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _reviewsCount: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 10000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _totalSalesValue: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 1000000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _totalUnitsSold: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 1000000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _complaintsCount?: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 1, max: 10000 })

  private _blockForSaleQuantity?: PropertyOrFactory<number> | undefined =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index => this.chance.integer({ min: 1, max: 10000 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  private _minimalInStockQuantityPermited?:
    | PropertyOrFactory<number>
    | undefined =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index => this.chance.integer({ min: 1, max: 10000 })

  static aProduct(): ProductFakeBuilder {
    return new ProductFakeBuilder()
  }

  static theProducts(counts: number): ProductFakeBuilder {
    return new ProductFakeBuilder<Product[]>(counts)
  }

  withProductId(id: PropertyOrFactory<ProductId>): this {
    this._id = id
    return this
  }

  withName(name: PropertyOrFactory<string>): this {
    this._name = name
    return this
  }

  withDescription(description: PropertyOrFactory<string>): this {
    this._description = description
    return this
  }

  withBlockedQuantity(blockedQuantity: PropertyOrFactory<number>): this {
    this._blockedQuantity = blockedQuantity
    return this
  }

  withSupplierId(supplierId: PropertyOrFactory<string>): this {
    this._supplierId = supplierId
    return this
  }

  withCategoryId(categoryId: PropertyOrFactory<string>): this {
    this._categoryId = categoryId
    return this
  }

  withCategoryIds(categoryIds: string[]): this {
    if (!categoryIds || categoryIds.length === 0) {
      throw new Error('Category IDs array cannot be empty')
    }
    this._categoryIds = categoryIds
    return this
  }

  withSupplierIds(supplierIds: string[]): this {
    if (!supplierIds || supplierIds.length === 0) {
      throw new Error('Supplier IDs array cannot be empty')
    }
    this._supplierIds = supplierIds
    return this
  }

  withInvoiceNumber(invoiceNumber: PropertyOrFactory<string>): this {
    this._invoiceNumber = invoiceNumber
    return this
  }

  withPrice(price: PropertyOrFactory<number>): this {
    this._price = price
    return this
  }

  withImages(images: PropertyOrFactory<string[]>): this {
    this._images = images
    return this
  }

  withDiscountedPrice(discountedPrice: PropertyOrFactory<number>): this {
    this._discountedPrice = discountedPrice
    return this
  }

  withStockQuantity(stockQuantity: PropertyOrFactory<number>): this {
    this._stockQuantity = stockQuantity
    return this
  }

  withUnitPrice(unitPrice: PropertyOrFactory<number>): this {
    this._unitPrice = unitPrice
    return this
  }

  withTotalAmount(totalAmount: PropertyOrFactory<number>): this {
    this._totalAmount = totalAmount
    return this
  }

  withStatus(status: PropertyOrFactory<ProductStatus>): this {
    this._status = status
    return this
  }

  withRatings(ratings: PropertyOrFactory<number>): this {
    this._ratings = ratings
    return this
  }

  withReviewsCount(reviewsCount: PropertyOrFactory<number>): this {
    this._reviewsCount = reviewsCount
    return this
  }

  withTotalSalesValue(totalSalesValue: PropertyOrFactory<number>): this {
    this._totalSalesValue = totalSalesValue
    return this
  }

  withTotalUnitsSold(totalUnitsSold: PropertyOrFactory<number>): this {
    this._totalUnitsSold = totalUnitsSold
    return this
  }

  withComplaintsCount(complaintsCount: PropertyOrFactory<number>): this {
    this._complaintsCount = complaintsCount
    return this
  }

  withBlockForSale(blockForSale: PropertyOrFactory<number>): this {
    this._blockForSaleQuantity = blockForSale
    return this
  }

  withMinimalInStockQuantityPermited(
    minimalInStockQuantityPermited: PropertyOrFactory<number>
  ): this {
    this._minimalInStockQuantityPermited = minimalInStockQuantityPermited
    return this
  }

  build(): TBuild {
    const products = new Array(this.countsObjs)
      .fill(undefined)
      .map((_, index) => {
        const product = new Product({
          id: !this._id ? undefined : this.callFactory(this._id, index),
          name: this.callFactory(this._name, index),
          description: this.callFactory(this._description, index),
          blockedQuantity: this.callFactory(this._blockedQuantity, index),
          supplierId: this._supplierIds
            ? this.chance.pickone(this._supplierIds)
            : this.chance.guid({ version: 4 }),
          categoryId: this._categoryIds
            ? this.chance.pickone(this._categoryIds)
            : this.chance.guid({ version: 4 }),
          invoiceNumber: this.callFactory(this._invoiceNumber, index),
          price: this.callFactory(this._price, index),
          images: this.callFactory(this._images, index),
          discountedPrice: this.callFactory(this._discountedPrice, index),
          stockQuantity: this.callFactory(this._stockQuantity, index),
          unitPrice: this.callFactory(this._unitPrice, index),
          totalAmount: this.callFactory(this._totalAmount, index),
          status: this.callFactory(this._status, index),
          ratings: this.callFactory(this._ratings, index),
          reviewsCount: this.callFactory(this._reviewsCount, index),
          totalSalesValue: this.callFactory(this._totalSalesValue, index),
          totalUnitsSold: this.callFactory(this._totalUnitsSold, index),
          complaintsCount: this.callFactory(this._complaintsCount, index),
          blockForSaleQuantity: this.callFactory(
            this._blockForSaleQuantity,
            index
          ),
          sku: this.callFactory(this._sku, index),
          details: this.callFactory(this._details, index),
          minimalInStockQuantityPermited: this.callFactory(
            this._minimalInStockQuantityPermited,
            index
          )
        })

        return product
      })
    return this.countsObjs === 1 ? (products[0] as any) : products
  }

  private callFactory(factoryOrValue: PropertyOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue
  }

  // build(): TBuild {
  //   const products = new Array(this.countsObjs)
  //     .fill(undefined)
  //     .map((_, index) => {
  //       const product = new Product({
  //         id: !this._id ? undefined : this.callFactory(this._id, index),
  //         name: this.callFactory(this._name, index),
  //         description: this.callFactory(this._description, index),
  //         blockedQuantity: this.callFactory(this._blockedQuantity, index),
  //         supplierId: this.callFactory(this._supplierId, index),
  //         categoryId: this.callFactory(this._categoryId, index),
  //         invoiceNumber: this.callFactory(this._invoiceNumber, index),
  //         price: this.callFactory(this._price, index),
  //         images: this.callFactory(this._images, index),
  //         discountedPrice: this.callFactory(this._discountedPrice, index),
  //         stockQuantity: this.callFactory(this._stockQuantity, index),
  //         unitPrice: this.callFactory(this._unitPrice, index),
  //         totalAmount: this.callFactory(this._totalAmount, index),
  //         status: this.callFactory(this._status, index),
  //         ratings: this.callFactory(this._ratings, index),
  //         reviewsCount: this.callFactory(this._reviewsCount, index),
  //         totalSalesValue: this.callFactory(this._totalSalesValue, index),
  //         totalUnitsSold: this.callFactory(this._totalUnitsSold, index),
  //         complaintsCount: this.callFactory(this._complaintsCount, index),
  //         blockForSaleQuantity: this.callFactory(
  //           this._blockForSaleQuantity,
  //           index
  //         ),
  //         sku: this.callFactory(this._sku, index),
  //         details: this.callFactory(this._details, index),
  //         minimalInStockQuantityPermited: this.callFactory(
  //           this._minimalInStockQuantityPermited,
  //           index
  //         )
  //       })

  //       return product
  //     })
  //   return this.countsObjs === 1 ? (products[0] as any) : products
  // }

  // private callFactory(factoryOrValue: PropertyOrFactory<any>, index: number) {
  //   return typeof factoryOrValue === 'function'
  //     ? factoryOrValue(index)
  //     : factoryOrValue
  // }

  private nameGenerate() {
    const firstName = this.chance.capitalize(this.chance.word({ length: 5 }))
    const lastName = this.chance.capitalize(this.chance.word({ length: 8 }))
    return `${firstName} ${lastName}`
  }

  private getValue(prop: any) {
    const optional = ['id', 'created_at']
    const privateProp = `_${prop}` as keyof this
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Property ${prop} not have a factory, use 'with' methods`)
    }
    return this.callFactory(this[privateProp], 0)
  }

  // getters

  get id() {
    return this.getValue('id')
  }

  get name() {
    return this.getValue('name')
  }

  // generate get for all prorperties

  get description() {
    return this.getValue('description')
  }

  get blockedQuantity() {
    return this.getValue('blockedQuantity')
  }

  get supplierId() {
    return this.getValue('supplierId')
  }

  get categoryId() {
    return this.getValue('categoryId')
  }

  get invoiceNumber() {
    return this.getValue('invoiceNumber')
  }

  get price() {
    return this.getValue('price')
  }

  // get all properties that not have factory

  get images() {
    return this.getValue('images')
  }

  get discountedPrice() {
    return this.getValue('discountedPrice')
  }

  get stockQuantity() {
    return this.getValue('stockQuantity')
  }

  get unitPrice() {
    return this.getValue('unitPrice')
  }

  get totalAmount() {
    return this.getValue('totalAmount')
  }

  get status() {
    return this.getValue('status')
  }

  get ratings() {
    return this.getValue('ratings')
  }

  get reviewsCount() {
    return this.getValue('reviewsCount')
  }

  get totalSalesValue() {
    return this.getValue('totalSalesValue')
  }

  get totalUnitsSold() {
    return this.getValue('totalUnitsSold')
  }

  get complaintsCount() {
    return this.getValue('complaintsCount')
  }

  get sku() {
    return this.getValue('sku')
  }

  get details() {
    return this.getValue('details')
  }

  get minimalInStockQuantityPermited() {
    return this.getValue('minimalInStockQuantityPermited')
  }

  get created_at() {
    return this.getValue('created_at')
  }

  get updated_at() {
    return this.getValue('updated_at')
  }

  get blockForSaleQuantity() {
    return this.getValue('blockForSaleQuantity')
  }
}
