import { Test, TestingModule } from '@nestjs/testing'
import { GenerateDumbDataService } from './generate-dumb-data.service'
import {
  ICategoryRepository,
  IProductRepository
} from '@modules/logistic/modules/product/domain/repositories'
import { ISupplierRepository } from '@modules/logistic/modules/supplier/domain/repositories'

describe('GenerateDumbDataService', () => {
  let service: GenerateDumbDataService
  let categoryRepo: ICategoryRepository

  let productRepo: IProductRepository

  let supplierRepo: ISupplierRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateDumbDataService,
        {
          provide: 'ICategoryRepository',
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            saveMany: jest.fn()
          }
        },
        {
          provide: 'IProductRepository',
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            saveMany: jest.fn()
          }
        },
        {
          provide: 'ISupplierRepository',
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            saveMany: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<GenerateDumbDataService>(GenerateDumbDataService)
    categoryRepo = module.get<ICategoryRepository>('ICategoryRepository')
    productRepo = module.get<IProductRepository>('IProductRepository')
    supplierRepo = module.get<ISupplierRepository>('ISupplierRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(categoryRepo).toBeDefined()
    expect(productRepo).toBeDefined()
    expect(supplierRepo).toBeDefined()
  })
})
