import { Test, TestingModule } from '@nestjs/testing'
import { GetProductByIdUseCase } from './get-product-by-id-use-case'
import { IProductRepository } from '@modules/logistic/modules/product/domain/repositories'

describe('GetProductByIdUseCase', () => {
  let service: GetProductByIdUseCase
  let repo: IProductRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductByIdUseCase,
        {
          provide: 'IProductRepository',
          useValue: {
            findById: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<GetProductByIdUseCase>(GetProductByIdUseCase)
    repo = module.get<IProductRepository>('IProductRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })
})
