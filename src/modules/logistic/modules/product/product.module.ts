import { Module } from '@nestjs/common'
import {
  CategoryController,
  ProductController
} from './application/controllers'
import {
  CreateCategoryUseCase,
  CreateProductUseCase,
  ListCategoryUseCase
} from './application/use-cases'
import { DatabaseModule } from '@modules/database/database.module'
import { DataSource } from 'typeorm'
import { CategoryModel, ProductModel } from './domain/models'
import {
  ProductTypeORMRepository,
  CategoryTypeORMRepository
} from './repositories'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController, ProductController],
  providers: [
    CreateCategoryUseCase,
    ListCategoryUseCase,
    CreateProductUseCase,
    {
      provide: 'ICategoryRepository',
      useFactory: (data: DataSource) =>
        new CategoryTypeORMRepository(data.getRepository(CategoryModel)),
      inject: ['dbConnectionTypeOrm']
    },
    {
      provide: 'IProductRepository',
      useFactory: (data: DataSource) =>
        new ProductTypeORMRepository(data.getRepository(ProductModel)),
      inject: ['dbConnectionTypeOrm']
    }
  ]
})
export class ProductModule {}
