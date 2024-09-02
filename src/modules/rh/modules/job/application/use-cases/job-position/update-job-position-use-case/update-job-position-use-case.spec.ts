import { Test, TestingModule } from '@nestjs/testing'
import { UpdateJobPositionUseCase } from './update-job-position-use-case'

describe('UpdateJobPositionUseCase', () => {
  let service: UpdateJobPositionUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateJobPositionUseCase]
    }).compile()

    service = module.get<UpdateJobPositionUseCase>(UpdateJobPositionUseCase)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
