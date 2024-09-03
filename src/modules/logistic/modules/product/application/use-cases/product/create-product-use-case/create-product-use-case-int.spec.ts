import { Test, TestingModule } from '@nestjs/testing'
import { CreateProductUseCase } from './create-product-use-case'
import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'

describe('CreateProductUseCase', () => {
  let service: CreateProductUseCase
  let repo: IProductRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: 'IProductRepository',
          useValue: {
            save: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<CreateProductUseCase>(CreateProductUseCase)
    repo = module.get<IProductRepository>('IProductRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })
})
