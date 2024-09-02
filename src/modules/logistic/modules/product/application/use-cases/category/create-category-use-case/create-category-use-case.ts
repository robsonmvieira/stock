import { Inject, Injectable } from '@nestjs/common'

import { CreateCategoryDtoProps, CreateCategoryDtoPropsValidator } from './dto'
import { ModelOutput } from '@modules/core/application/usecases/common'
import { ICategoryRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Category } from '@modules/logistic/modules/product/domain/entities/category.entity'
import { CategoryMapper } from '../../../mappers'

@Injectable()
export class CreateCategoryUseCase {
  @Inject('ICategoryRepository')
  private repo: ICategoryRepository
  async execute(createCategoryCommand: CreateCategoryDtoProps) {
    const validate = CreateCategoryDtoPropsValidator.validate(
      createCategoryCommand
    )
    if (Object.keys(validate).length !== 0) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: validate
      })
    }

    const categoryAlreadyExists = await this.repo.findByName(
      createCategoryCommand.name
    )

    if (categoryAlreadyExists) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          name: 'category already exists'
        }
      })
    }

    const category = Category.create(createCategoryCommand)

    if (category.notification.hasError()) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: category.notification.errors
      })
    }

    const categoryModelToSave = CategoryMapper.fromEntityToModel(category)

    await this.repo.save(categoryModelToSave)

    return new ModelOutput({
      hasError: false,
      data: null,
      error: null
    })
  }
}
