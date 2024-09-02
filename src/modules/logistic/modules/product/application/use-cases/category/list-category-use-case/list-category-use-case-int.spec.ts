import { Test, TestingModule } from '@nestjs/testing'
import { ListCategoryUseCase } from './list-category-use-case'
import { ICategoryRepository } from '@modules/logistic/modules/product/domain/repositories'

describe('ListCategoryUseCase', () => {
  let service: ListCategoryUseCase
  let repo: ICategoryRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListCategoryUseCase,
        {
          provide: 'ICategoryRepository',
          useValue: {
            findAll: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<ListCategoryUseCase>(ListCategoryUseCase)
    repo = module.get<ICategoryRepository>('ICategoryRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })
})
