import { Module } from '@nestjs/common';
import { YoutubeChannelService } from './youtube-channel.service';
import { YoutubeChannelResolver } from './youtube-channel.resolver';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { YoutubeChannel } from "./entities/youtube-channel.entity";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([YoutubeChannel])],
  providers: [YoutubeChannelResolver, YoutubeChannelService],
  exports: [YoutubeChannelService]
})
export class YoutubeChannelModule {}
