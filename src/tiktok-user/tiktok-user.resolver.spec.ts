import { Test, TestingModule } from '@nestjs/testing';
import { TiktokUserResolver } from './tiktok-user.resolver';
import { TiktokUserService } from './tiktok-user.service';

describe('TiktokUserResolver', () => {
  let resolver: TiktokUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiktokUserResolver, TiktokUserService],
    }).compile();

    resolver = module.get<TiktokUserResolver>(TiktokUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
