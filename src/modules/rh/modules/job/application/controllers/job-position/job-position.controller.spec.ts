import { Test, TestingModule } from '@nestjs/testing'
import { JobPositionController } from './job-position.controller'
import {
  CreateJobPositionUseCase,
  ListJobPositionUseCase
} from '../../use-cases/job-position'
import {
  ModelCollectionOutput,
  ModelOutput
} from '@modules/core/application/usecases/common'
import { CreateJobPositionDto } from '../../use-cases/job-position/create-job-position-use-case/dto/create-job-position.props'

describe('JobPositionController', () => {
  let controller: JobPositionController
  let listJobPositionUseCase: ListJobPositionUseCase
  let createJobPositionUseCase: CreateJobPositionUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPositionController],
      providers: [
        {
          provide: ListJobPositionUseCase,
          useValue: {
            execute: jest.fn()
          }
        },
        {
          provide: CreateJobPositionUseCase,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<JobPositionController>(JobPositionController)
    listJobPositionUseCase = module.get<ListJobPositionUseCase>(
      ListJobPositionUseCase
    )
    createJobPositionUseCase = module.get<CreateJobPositionUseCase>(
      CreateJobPositionUseCase
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('list', () => {
    it('should return a list of job positions', async () => {
      const mockJobPositions = [{ id: 1, title: 'Developer' }]
      const response = new ModelCollectionOutput({
        hasError: false,
        data: mockJobPositions,
        error: null
      })
      jest.spyOn(listJobPositionUseCase, 'execute').mockResolvedValue(response)

      const req: any = {}
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await controller.list(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(response)
    })
  })

  describe('create', () => {
    it('should create a job position and return the data with status 201', async () => {
      const response = new ModelOutput({
        hasError: false,
        data: null,
        error: null
      })
      const createJobDto = { title: 'Developer', description: 'Developer' }
      jest
        .spyOn(createJobPositionUseCase, 'execute')
        .mockResolvedValue(response)

      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await controller.create(res, createJobDto)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(response)
    })

    it('should return a 400 status if there is an error', async () => {
      const createJobDto = { title: 'Developer', description: 'Developer' }

      const mockErrorResponse = new ModelOutput({
        hasError: true,
        data: null,
        error: 'Error creating job position'
      })
      jest
        .spyOn(createJobPositionUseCase, 'execute')
        .mockResolvedValue(mockErrorResponse)

      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await controller.create(res, createJobDto)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith(mockErrorResponse)
    })
  })
})
