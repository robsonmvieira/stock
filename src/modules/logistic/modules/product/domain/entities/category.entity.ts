import { Entity } from '@modules/core/domain/entities'
import { ValueObject } from '@modules/core/domain/valueObject'
import { CategoryId } from '../valueObject/category.uuid'
import { Product } from './product.entity'

type CreateCategoryCommand = {
  name: string
  description?: string
}
type CategoryProps = {
  name: string
  description?: string
  products: Product[]

  id?: CategoryId
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  is_deleted?: boolean
  is_blocked?: boolean
}

export class Category extends Entity {
  name: string
  description?: string
  products: Product[]

  constructor({
    name,
    description,
    products,
    id,
    created_at,
    updated_at,
    deleted_at,
    is_deleted,
    is_blocked
  }: CategoryProps) {
    super(id, created_at, updated_at, is_deleted, is_blocked, deleted_at)
    this.name = name
    this.description = description
    this.products = products
  }

  static create({ name, description }: CreateCategoryCommand) {
    return new Category({
      name,
      description,
      products: []
    })
  }

  changeName(newName: string) {
    if (!newName) {
      this.addErrorOnContainer('Nome inválido', 'nome')
      return false
    }

    if (newName.length < 3) {
      this.addErrorOnContainer('Nome inválido', 'nome')
      return false
    }
    this.name = newName
  }

  changeDescription(newDescription: string) {
    this.description = newDescription
  }

  get entity_id(): ValueObject {
    return this.id
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    }
  }
}
