import { Test, TestingModule } from '@nestjs/testing'
import { CategoryController } from './category.controller'
import { CreateCategoryUseCase, ListCategoryUseCase } from '../../use-cases'

describe('CategoryController', () => {
  let controller: CategoryController
  let createCategoryUseCase: CreateCategoryUseCase
  let listCategoryUseCase: ListCategoryUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CreateCategoryUseCase,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: ListCategoryUseCase,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<CategoryController>(CategoryController)
    createCategoryUseCase = module.get<CreateCategoryUseCase>(
      CreateCategoryUseCase
    )
    listCategoryUseCase = module.get<ListCategoryUseCase>(ListCategoryUseCase)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(createCategoryUseCase).toBeDefined()
    expect(listCategoryUseCase).toBeDefined()
  })
})
