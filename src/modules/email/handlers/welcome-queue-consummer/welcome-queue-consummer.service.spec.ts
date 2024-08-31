import { Test, TestingModule } from '@nestjs/testing'

import { EmailService } from '../email.service'
import { Job } from 'bull'
import { AddEmailCommand } from '../welcome-handler/welcome-handler.service'
import { WelcomeQueueConsummerService } from './welcome-queue-consummer.service'

describe('WelcomeQueueConsumerService', () => {
  let service: WelcomeQueueConsummerService
  let emailService: EmailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WelcomeQueueConsummerService,
        {
          provide: EmailService,
          useValue: {
            execute: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<WelcomeQueueConsummerService>(
      WelcomeQueueConsummerService
    )
    emailService = module.get<EmailService>(EmailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('execute', () => {
    it('should call EmailService with correct parameters', async () => {
      const job: Job<AddEmailCommand> = {
        id: '1',
        data: {
          to: 'test@example.com',
          subject: 'Welcome',
          text: 'Welcome to our service!',
          html: '<p>Welcome to our service!</p>'
        }
      } as Job<AddEmailCommand>

      await service.execute(job)

      expect(emailService.execute).toHaveBeenCalledWith({
        to: 'test@example.com',
        subject: 'Welcome',
        text: 'Welcome to our service!',
        html: '<p>Welcome to our service!</p>'
      })
    })
  })

  describe('onActive', () => {
    it('should log the active job', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      const job: Job<AddEmailCommand> = {
        id: '1',
        data: {
          to: 'test@example.com',
          subject: 'Welcome',
          text: 'Welcome to our service!',
          html: '<p>Welcome to our service!</p>'
        }
      } as Job<AddEmailCommand>

      service.onActive(job)

      expect(consoleSpy).toHaveBeenCalledWith(`Processor ${job.id} is active!`)
    })
  })

  describe('onCompleted', () => {
    it('should log the completed job', async () => {
      const consoleSpy = jest.spyOn(console, 'log')
      const job: Job<AddEmailCommand> = {
        id: '1',
        data: {
          to: 'test@example.com',
          subject: 'Welcome',
          text: 'Welcome to our service!',
          html: '<p>Welcome to our service!</p>'
        }
      } as Job<AddEmailCommand>

      await service.onCompleted(job)

      expect(consoleSpy).toHaveBeenCalledWith(`Processor ${job.id} completed!`)
    })
  })

  describe('onFailed', () => {
    it('should log the failed job and error message', async () => {
      const consoleSpy = jest.spyOn(console, 'log')
      const job: Job<AddEmailCommand> = {
        id: '1',
        data: {
          to: 'test@example.com',
          subject: 'Welcome',
          text: 'Welcome to our service!',
          html: '<p>Welcome to our service!</p>'
        }
      } as Job<AddEmailCommand>

      const error = new Error('Test error')
      await service.onFailed(job, error)

      expect(consoleSpy).toHaveBeenCalledWith(
        `Processor ${job.id} failed with ${error.message}`
      )
    })
  })
})
