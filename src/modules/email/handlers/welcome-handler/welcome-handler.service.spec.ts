import { Test, TestingModule } from '@nestjs/testing'
import { WelcomeQueueHandlerPublisher } from './welcome-handler.service'

describe('WelcomeQueueHandlerPublisher', () => {
  let service: WelcomeQueueHandlerPublisher

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WelcomeQueueHandlerPublisher]
    }).compile()

    service = module.get<WelcomeQueueHandlerPublisher>(
      WelcomeQueueHandlerPublisher
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
