import { Test, TestingModule } from '@nestjs/testing'
import { CreateCategoryUseCase } from './create-category-use-case'
import { ICategoryRepository } from '@modules/logistic/modules/product/domain/repositories'

describe('CreateCategoryUseCase', () => {
  let service: CreateCategoryUseCase
  let repo: ICategoryRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCategoryUseCase,
        {
          provide: 'ICategoryRepository',
          useValue: {
            save: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<CreateCategoryUseCase>(CreateCategoryUseCase)
    repo = module.get<ICategoryRepository>('ICategoryRepository')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })
})
