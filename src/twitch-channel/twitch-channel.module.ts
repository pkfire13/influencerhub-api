import { Module } from '@nestjs/common';
import { TwitchChannelService } from './twitch-channel.service';
import { TwitchChannelResolver } from './twitch-channel.resolver';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchChannel } from './entities/twitch-channel.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([TwitchChannel])],
  providers: [TwitchChannelResolver, TwitchChannelService],
  exports: [TwitchChannelService],
})
export class TwitchChannelModule {}
