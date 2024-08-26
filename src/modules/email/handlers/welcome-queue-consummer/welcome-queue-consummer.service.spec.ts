import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeQueueConsummerService } from './welcome-queue-consummer.service';

describe('WelcomeQueueConsummerService', () => {
  let service: WelcomeQueueConsummerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WelcomeQueueConsummerService],
    }).compile();

    service = module.get<WelcomeQueueConsummerService>(WelcomeQueueConsummerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
