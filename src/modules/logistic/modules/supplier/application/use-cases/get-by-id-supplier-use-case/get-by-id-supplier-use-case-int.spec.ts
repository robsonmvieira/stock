import { Test, TestingModule } from '@nestjs/testing'
import { GetByIdSupplierUseCase } from './get-by-id-supplier-use-case'

describe('GetByIdSupplierUseCase', () => {
  let service: GetByIdSupplierUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetByIdSupplierUseCase]
    }).compile()

    service = module.get<GetByIdSupplierUseCase>(GetByIdSupplierUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
