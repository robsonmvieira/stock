import { CategoryModel } from '@modules/logistic/modules/product/domain/models'
import { IRepository } from 'src/modules/core/domain/repositories'

export interface ICategoryRepository extends IRepository<CategoryModel> {
  findByName(name: string): Promise<CategoryModel>
  saveMany(categories: CategoryModel[]): Promise<void>
}
