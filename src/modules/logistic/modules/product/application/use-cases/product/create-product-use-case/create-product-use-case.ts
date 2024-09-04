import { ModelOutput } from '@modules/core/application/usecases/common'
import { Product } from '@modules/logistic/modules/product/domain/entities'
import {
  ICategoryRepository,
  IProductRepository
} from '@modules/logistic/modules/product/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { CreateProductDtoProps, CreateProductDtoPropsValidator } from './dto'
import { ProductMapper } from '../../../mappers'
import { IUnitOfWork } from '@modules/core/domain/repositories'
import { ISupplierRepository } from '@modules/logistic/modules/supplier/domain/repositories'

@Injectable()
export class CreateProductUseCase {
  @Inject('IProductRepository')
  private repo: IProductRepository

  @Inject('ISupplierRepository')
  private supplierRepo: ISupplierRepository

  @Inject('ICategoryRepository')
  private categoryRepo: ICategoryRepository

  @Inject('IUnitOfWork')
  private uow: IUnitOfWork
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

    await this.uow.do(async () => {
      // await this.repo.save(productModelToSave)
      console.log('dentro da transaction')
      const supplier = await this.supplierRepo.findById(
        createProductCommand.supplierId
      )

      if (!supplier) {
        return new ModelOutput({
          hasError: true,
          data: null,
          error: {
            supplier: 'supplier not found'
          }
        })
      }

      supplier.products.push(productModelToSave.id)

      const categoryExists = await this.categoryRepo.findById(
        createProductCommand.categoryId
      )

      if (!categoryExists) {
        return new ModelOutput({
          hasError: true,
          data: null,
          error: {
            category: 'category not found'
          }
        })
      }
      categoryExists.productsIds.push(productModelToSave.id)
      await this.repo.save(productModelToSave)
      await this.categoryRepo.save(categoryExists)
      await this.supplierRepo.save(supplier)
    })

    return new ModelOutput({
      hasError: false,
      data: null,
      error: null
    })
  }
}

//supplierId: c046fd2d-da95-469c-8158-eeeb66e201c4
// categoryId: d6100d8f-b067-40b1-b832-b2115555352a
