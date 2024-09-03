import { ModelOutput } from '@modules/core/application/usecases/common'
import { Product } from '@modules/logistic/modules/product/domain/entities'
import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { CreateProductDtoProps, CreateProductDtoPropsValidator } from './dto'
import { ProductMapper } from '../../../mappers'

@Injectable()
export class CreateProductUseCase {
  @Inject('IProductRepository')
  private repo: IProductRepository
  async execute(createProductCommand: CreateProductDtoProps) {
    const validate =
      CreateProductDtoPropsValidator.validate(createProductCommand)
    if (Object.keys(validate).length !== 0) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: validate
      })
    }

    const productAlreadyExists = await this.repo.findByName(
      createProductCommand.name
    )

    if (productAlreadyExists) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          name: 'product already exists'
        }
      })
    }

    const product = Product.create(createProductCommand)

    if (product.notification.hasError()) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: product.notification.errors
      })
    }

    const productModelToSave = ProductMapper.fromEntityToModel(product)
    console.log(productModelToSave)

    return new ModelOutput({
      hasError: false,
      data: null,
      error: null
    })
  }
}
