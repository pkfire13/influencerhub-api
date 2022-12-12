import { Module } from '@nestjs/common';
import { TiktokUserService } from './tiktok-user.service';
import { TiktokUserResolver } from './tiktok-user.resolver';

@Module({
  providers: [TiktokUserResolver, TiktokUserService]
})
export class TiktokUserModule {}
