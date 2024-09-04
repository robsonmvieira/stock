import { Test, TestingModule } from '@nestjs/testing'
import { CreateProductUseCase } from './create-product-use-case'
import {
  ICategoryRepository,
  IProductRepository
} from '@modules/logistic/modules/product/domain/repositories'
import { IUnitOfWork } from '@modules/core/domain/repositories'
import { ISupplierRepository } from '@modules/logistic/modules/supplier/domain/repositories'

describe('CreateProductUseCase', () => {
  let service: CreateProductUseCase
  let repo: IProductRepository
  let supplierRepo: ISupplierRepository

  let categoryRepo: ICategoryRepository

  let uow: IUnitOfWork

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: 'IProductRepository',
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: 'ICategoryRepository',
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: 'ISupplierRepository',
          useValue: {
            save: jest.fn()
          }
        },
        {
          provide: 'IUnitOfWork',
          useValue: {
            commit: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<CreateProductUseCase>(CreateProductUseCase)
    repo = module.get<IProductRepository>('IProductRepository')
    categoryRepo = module.get<ICategoryRepository>('ICategoryRepository')
    supplierRepo = module.get<ISupplierRepository>('ISupplierRepository')
    uow = module.get<IUnitOfWork>('IUnitOfWork')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
    expect(categoryRepo).toBeDefined()
    expect(supplierRepo).toBeDefined()
    expect(uow).toBeDefined()
  })
})
