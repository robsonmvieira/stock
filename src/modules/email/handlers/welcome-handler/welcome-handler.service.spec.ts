import { Test, TestingModule } from '@nestjs/testing'
import {
  AddEmailCommand,
  WelcomeQueueHandlerPublisher
} from './welcome-handler.service'
import { Queue } from 'bull'
import { getQueueToken } from '@nestjs/bull'

describe('WelcomeQueueHandlerPublisher', () => {
  let service: WelcomeQueueHandlerPublisher
  let emailQueue: Queue
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WelcomeQueueHandlerPublisher,
        {
          provide: getQueueToken('EMAIL'),
          useValue: {
            add: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<WelcomeQueueHandlerPublisher>(
      WelcomeQueueHandlerPublisher
    )

    emailQueue = module.get<Queue>(getQueueToken('EMAIL'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should add an email to the queue with correct parameters', async () => {
    const emailCommand: AddEmailCommand = {
      to: 'test@example.com',
      subject: 'Welcome',
      text: 'Welcome to our service!',
      html: '<p>Welcome to our service!</p>'
    }

    await service.execute(emailCommand)

    expect(emailQueue.add).toHaveBeenCalledWith('EMAIL', emailCommand)
  })

  it('should handle errors when adding to the queue', async () => {
    const emailCommand: AddEmailCommand = {
      to: 'test@example.com',
      subject: 'Welcome',
      text: 'Welcome to our service!',
      html: '<p>Welcome to our service!</p>'
    }

    jest.spyOn(emailQueue, 'add').mockRejectedValue(new Error('Queue failed'))

    await expect(service.execute(emailCommand)).rejects.toThrow('Queue failed')
  })
})
