import { DataSource } from 'typeorm'
import { ProductBlockedInQueueHandler } from '../../application/handlers'
import {
  BlockProductUseCase,
  CreateProductUseCase,
  ListProductUseCase
} from '../../application/use-cases'
import { ProductTypeORMRepository } from '../repositories'
import { ProductModel } from '../../domain/models'

const REPOSITORIES_PROVIDERS = {
  PRODUCT_REPOSITORY: {
    provide: 'IProductRepository',
    useFactory: (data: DataSource) =>
      new ProductTypeORMRepository(data.getRepository(ProductModel)),
    inject: ['dbConnectionTypeOrm']
  }
}

const USE_CASES_PROVIDERS = {
  LIST_PRODUCT_USE_CASE: {
    provide: ListProductUseCase,
    useClass: ListProductUseCase
  },
  BLOCK_PRODUCT_USE_CASE: {
    provide: BlockProductUseCase,
    useClass: BlockProductUseCase
  },

  CREATE_PRODUCT_USE_CASE: {
    provide: CreateProductUseCase,
    useClass: CreateProductUseCase
  }
}

const DOMAIN_EVENT_HANDLER_PROVIDERS = {
  PRODUCT_BLOCKED_IN_QUEUE_HANDLER: {
    provide: ProductBlockedInQueueHandler,
    useClass: ProductBlockedInQueueHandler
  }
}

export const PRODUCT_PROVIDERS = {
  REPOSITORIES_PROVIDERS,
  USE_CASES_PROVIDERS,
  DOMAIN_EVENT_HANDLER_PROVIDERS
}
