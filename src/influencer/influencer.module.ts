import { Module } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { InfluencerResolver } from './influencer.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Influencer } from "./entities/influencer.entity";
import { TwitterUserModule } from "src/twitter-user/twitter-user.module";
import { YoutubeChannelModule } from "src/youtube-channel/youtube-channel.module";
import { TwitchChannelModule } from "src/twitch-channel/twitch-channel.module";

@Module({
  imports: [TypeOrmModule.forFeature([Influencer]), TwitterUserModule, YoutubeChannelModule, TwitchChannelModule],
  providers: [InfluencerResolver, InfluencerService]
})
export class InfluencerModule {}
