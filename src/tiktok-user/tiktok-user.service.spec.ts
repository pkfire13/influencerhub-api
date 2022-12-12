import { Test, TestingModule } from '@nestjs/testing';
import { TiktokUserService } from './tiktok-user.service';

describe('TiktokUserService', () => {
  let service: TiktokUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiktokUserService],
    }).compile();

    service = module.get<TiktokUserService>(TiktokUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
