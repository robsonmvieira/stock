import { Chance } from 'chance'
import { CategoryId } from '../valueObject/category.uuid'
import { Category } from '../entities/category.entity'

type PropertyOrFactory<T> = T | ((index: number) => T)

export class CategoryFakeBuilder<TBuild = any> {
  private countsObjs: number
  private chance: Chance.Chance

  private constructor(counts: number = 1) {
    this.countsObjs = counts
    this.chance = new Chance()
  }

  private _id: PropertyOrFactory<CategoryId> | undefined = undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _name: PropertyOrFactory<string> | undefined = _index =>
    this.nameGenerate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _description: PropertyOrFactory<string> | undefined = _index =>
    this.descriptionGenerate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _products: PropertyOrFactory<string[]> | undefined = _index => {
    const length = this.chance.integer({ min: 1, max: 20 })
    return Array.from({ length }, () => this.chance.guid({ version: 4 }))
  }
  private nameGenerate() {
    const firstName = this.chance.capitalize(this.chance.word({ length: 5 }))
    const lastName = this.chance.capitalize(this.chance.word({ length: 8 }))
    return `${firstName} ${lastName}`
  }

  private descriptionGenerate() {
    return this.chance.paragraph({ sentences: 1 })
  }

  static aCategory(): CategoryFakeBuilder {
    return new CategoryFakeBuilder()
  }

  static theCategories(counts: number): CategoryFakeBuilder {
    return new CategoryFakeBuilder<Category[]>(counts)
  }

  build(): TBuild {
    const categories = new Array(this.countsObjs)
      .fill(undefined)
      .map((_, index) => {
        const category = new Category({
          id: !this._id ? undefined : this.callFactory(this._id, index),
          name: this.callFactory(this._name, index),
          description: this.callFactory(this._description, index),
          products: this.callFactory(this._products, index)
        })

        return category
      })
    return this.countsObjs === 1 ? (categories[0] as any) : categories
  }

  private getValue(prop: any) {
    const optional = ['id', 'created_at']
    const privateProp = `_${prop}` as keyof this
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Property ${prop} not have a factory, use 'with' methods`)
    }
    return this.callFactory(this[privateProp], 0)
  }

  private callFactory(factoryOrValue: PropertyOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue
  }

  withId(id: PropertyOrFactory<CategoryId>): this {
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

  withProducts(products: PropertyOrFactory<string[]>): this {
    this._products = products
    return this
  }

  get id() {
    return this.getValue('id')
  }

  get name() {
    return this.getValue('name')
  }

  get description() {
    return this.getValue('description')
  }

  get products() {
    return this.getValue('products')
  }
}
