import { Test, TestingModule } from '@nestjs/testing'
import { UpdateSupplierUseCase } from './update-supplier-use-case'

describe('UpdateSupplierUseCase', () => {
  let service: UpdateSupplierUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateSupplierUseCase]
    }).compile()

    service = module.get<UpdateSupplierUseCase>(UpdateSupplierUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
