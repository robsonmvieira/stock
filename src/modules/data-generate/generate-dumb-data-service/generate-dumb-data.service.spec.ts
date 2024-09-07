import { Test, TestingModule } from '@nestjs/testing';
import { GenerateDumbDataService } from './generate-dumb-data.service';

describe('GenerateDumbDataService', () => {
  let service: GenerateDumbDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateDumbDataService],
    }).compile();

    service = module.get<GenerateDumbDataService>(GenerateDumbDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
