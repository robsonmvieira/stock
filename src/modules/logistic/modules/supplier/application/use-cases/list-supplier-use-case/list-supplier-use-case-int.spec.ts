import { Test, TestingModule } from '@nestjs/testing'
import { ListSupplierUseCase } from './list-supplier-use-case'
import { ISupplierRepository } from '../../../domain/repositories'

describe('ListSupplierUseCase', () => {
  let service: ListSupplierUseCase
  let repo: ISupplierRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListSupplierUseCase,
        {
          provide: 'ISupplierRepository',
          useValue: {
            findAll: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<ListSupplierUseCase>(ListSupplierUseCase)
    repo = module.get<ISupplierRepository>('ISupplierRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })
})
