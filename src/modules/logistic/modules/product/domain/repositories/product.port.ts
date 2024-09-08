import { ProductModel } from '@modules/logistic/modules/product/domain/models'
import { IRepository } from 'src/modules/core/domain/repositories'

export interface IProductRepository extends IRepository<ProductModel> {
  findByName(name: string): Promise<ProductModel | undefined>

  saveMany(products: ProductModel[]): Promise<void>
}
