import { Test, TestingModule } from '@nestjs/testing'
import { ListProductUseCase } from './list-product-use-case'
import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'

describe('ListProductUseCase', () => {
  let service: ListProductUseCase
  let repo: IProductRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProductUseCase,
        {
          provide: 'IProductRepository',
          useValue: {
            findAll: jest.fn(),
            update: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<ListProductUseCase>(ListProductUseCase)
    repo = module.get<IProductRepository>('IProductRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })
})
