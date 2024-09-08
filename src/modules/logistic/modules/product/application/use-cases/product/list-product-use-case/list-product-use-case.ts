import { ModelCollectionOutput } from '@modules/core/application/usecases/common'
import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { ProductOutput } from './dto'
import { ProductMapper } from '../../../mappers'

@Injectable()
export class ListProductUseCase {
  @Inject('IProductRepository')
  private repo: IProductRepository

  async execute(): Promise<ModelCollectionOutput<ProductOutput>> {
    const productsList = await this.repo.findAll()

    const collection = productsList.map(product =>
      ProductMapper.fromModelToOutput(product)
    )

    return new ModelCollectionOutput({
      hasError: false,
      data: collection,
      error: null
    })
  }
}
