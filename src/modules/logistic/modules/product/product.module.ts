import { Global, Module } from '@nestjs/common'
import {
  CategoryController,
  ProductController
} from './application/controllers'
import {
  CreateCategoryUseCase,
  ListCategoryUseCase
} from './application/use-cases'
import { DatabaseModule } from '@modules/database/database.module'
import { DataSource } from 'typeorm'
import { CategoryModel } from './domain/models'
import { CategoryTypeORMRepository } from './infra'
import { SharedModule } from '@modules/shared/shared.module'
import { SupplierModule } from '../supplier/supplier.module'
import { PRODUCT_PROVIDERS } from './infra/providers'
import { EventModule } from '@modules/event/event.module'

@Global()
@Module({
  imports: [DatabaseModule, SharedModule, SupplierModule, EventModule],
  controllers: [CategoryController, ProductController],
  providers: [
    CreateCategoryUseCase,
    ListCategoryUseCase,
    {
      provide: 'ICategoryRepository',
      useFactory: (data: DataSource) =>
        new CategoryTypeORMRepository(data.getRepository(CategoryModel)),
      inject: ['dbConnectionTypeOrm']
    },

    ...Object.values(PRODUCT_PROVIDERS.REPOSITORIES_PROVIDERS),
    ...Object.values(PRODUCT_PROVIDERS.DOMAIN_EVENT_HANDLER_PROVIDERS),
    ...Object.values(PRODUCT_PROVIDERS.USE_CASES_PROVIDERS)
  ]
})
export class ProductModule {}
