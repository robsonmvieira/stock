import { Test, TestingModule } from '@nestjs/testing'
import { SupplierController } from './supplier.controller'
import { ListSupplierUseCase, CreateSupplierUseCase } from '../../use-cases'

describe('SupplierController', () => {
  let controller: SupplierController
  let listSupplierUseCase: ListSupplierUseCase
  let createSupplierUseCase: CreateSupplierUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: ListSupplierUseCase,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CreateSupplierUseCase,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<SupplierController>(SupplierController)
    listSupplierUseCase = module.get<ListSupplierUseCase>(ListSupplierUseCase)
    createSupplierUseCase = module.get<CreateSupplierUseCase>(
      CreateSupplierUseCase
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(listSupplierUseCase).toBeDefined()
    expect(createSupplierUseCase).toBeDefined()
  })
})
