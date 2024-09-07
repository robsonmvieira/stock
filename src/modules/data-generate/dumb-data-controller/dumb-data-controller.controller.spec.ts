import { Test, TestingModule } from '@nestjs/testing'
import { DumbDataController } from './dumb-data-controller.controller'
import { GenerateDumbDataService } from '../generate-dumb-data-service/generate-dumb-data.service'

describe('DumbDataController', () => {
  let controller: DumbDataController
  let generateDumbDataService: GenerateDumbDataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DumbDataController],
      providers: [
        {
          provide: GenerateDumbDataService,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<DumbDataController>(DumbDataController)
    generateDumbDataService = module.get<GenerateDumbDataService>(
      GenerateDumbDataService
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(generateDumbDataService).toBeDefined()
  })
})
