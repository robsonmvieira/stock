import { Category } from '../../domain/entities/category.entity'
import { CategoryModel } from '../../domain/models'
import { CategoryId } from '../../domain/valueObject/category.uuid'
import { CategoryOutput } from '../use-cases/category/list-category-use-case/dto'

export class CategoryMapper {
  static fromEntityToModel(entity: Category): CategoryModel {
    return new CategoryModel({
      id: entity.id.id,
      name: entity.name,
      products: entity.products.map(product => product),
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
      is_deleted: entity.is_deleted,
      is_blocked: entity.is_blocked
    })
  }

  static fromModelToEntity(model: CategoryModel): Category {
    return new Category({
      id: new CategoryId(model.id),
      name: model.name,
      products: model.productsIds,
      description: model.description,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
      is_deleted: model.is_deleted,
      is_blocked: model.is_blocked
    })
  }

  static fromModelToOutput(model: CategoryModel): CategoryOutput {
    return {
      id: model?.id,
      name: model?.name,
      description: model?.description,
      createdAt: model?.created_at,
      updatedAt: model?.updated_at,
      deletedAt: model?.deleted_at,
      isDeleted: model?.is_deleted,
      isBlocked: model?.is_blocked
    }
  }
}
