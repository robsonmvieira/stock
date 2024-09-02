import { Module } from '@nestjs/common'
import { CategoryController } from './application/controllers'
import {
  CreateCategoryUseCase,
  ListCategoryUseCase
} from './application/use-cases'
import { DatabaseModule } from '@modules/database/database.module'
import { DataSource } from 'typeorm'
import { CategoryTypeORMRepository } from './repositories/category.typeorm.repository'
import { CategoryModel } from './domain/models'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    ListCategoryUseCase,
    {
      provide: 'ICategoryRepository',
      useFactory: (data: DataSource) =>
        new CategoryTypeORMRepository(data.getRepository(CategoryModel)),
      inject: ['dbConnectionTypeOrm']
    }
  ]
})
export class ProductModule {}
