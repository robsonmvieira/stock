import { BaseRepository } from '@modules/core/infra'
import { CategoryModel } from '../domain/models'
import { ICategoryRepository } from '../domain/repositories'

export class CategoryTypeORMRepository
  extends BaseRepository<CategoryModel>
  implements ICategoryRepository {}
