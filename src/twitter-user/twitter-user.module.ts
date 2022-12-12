import { Module } from '@nestjs/common';
import { TwitterUserService } from './twitter-user.service';
import { TwitterUserResolver } from './twitter-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitterUser } from './entities/twitter-user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([TwitterUser])],
  providers: [TwitterUserResolver, TwitterUserService],
  exports: [TwitterUserService]
})
export class TwitterUserModule {}
