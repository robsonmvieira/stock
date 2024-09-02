import { ICategoryRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { CategoryOutput } from './dto'
import { CategoryMapper } from '../../../mappers'
import { ModelCollectionOutput } from '@modules/core/application/usecases/common'

@Injectable()
export class ListCategoryUseCase {
  @Inject('ICategoryRepository')
  private repo: ICategoryRepository
  async execute(): Promise<ModelCollectionOutput<CategoryOutput>> {
    const collection = await this.repo.findAll()

    return new ModelCollectionOutput({
      hasError: false,
      data: collection.map(category =>
        CategoryMapper.fromModelToOutput(category)
      ),
      error: null
    })
  }
}
