import { BaseRepository } from '@modules/core/infra'
import { ProductModel } from '../../domain/models'
import { IProductRepository } from '../../domain/repositories'

export class ProductTypeORMRepository
  extends BaseRepository<ProductModel>
  implements IProductRepository
{
  async saveMany(products: ProductModel[]): Promise<void> {
    await this.repo.save(products)
  }
  async findByName(name: string): Promise<ProductModel | undefined> {
    return await this.repo.findOne({ where: { name } })
  }
}
