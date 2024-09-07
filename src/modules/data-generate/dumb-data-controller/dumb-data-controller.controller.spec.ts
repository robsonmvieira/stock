import { Test, TestingModule } from '@nestjs/testing';
import { DumbDataControllerController } from './dumb-data-controller.controller';

describe('DumbDataControllerController', () => {
  let controller: DumbDataControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DumbDataControllerController],
    }).compile();

    controller = module.get<DumbDataControllerController>(DumbDataControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
