import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { ProductMapper } from '../../../mappers'
import { ModelOutput } from '@modules/core/application/usecases/common'

@Injectable()
export class GetProductByIdUseCase {
  @Inject('IProductRepository')
  private repo: IProductRepository

  async execute(id: string): Promise<ModelOutput> {
    const product = await this.repo.findById(id)

    if (!product) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: 'Product not found'
      })
    }
    const output = ProductMapper.fromModelToOutput(product)

    return new ModelOutput({
      hasError: false,
      data: output,
      error: null
    })
  }
}
