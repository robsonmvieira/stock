import { BaseRepository } from '@modules/core/infra'
import { CategoryModel } from '../../domain/models'
import { ICategoryRepository } from '../../domain/repositories'

export class CategoryTypeORMRepository
  extends BaseRepository<CategoryModel>
  implements ICategoryRepository
{
  async saveMany(categories: CategoryModel[]): Promise<void> {
    await this.repo.save(categories)
  }
  async findByName(name: string): Promise<CategoryModel> {
    return await this.repo.findOne({ where: { name } })
  }
}
