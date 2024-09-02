import { Test, TestingModule } from '@nestjs/testing'
import { ListSupplierUseCase } from './list-supplier-use-case'

describe('ListSupplierUseCase', () => {
  let service: ListSupplierUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListSupplierUseCase]
    }).compile()

    service = module.get<ListSupplierUseCase>(ListSupplierUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
