import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { join } from 'path';
import { InfluencerModule } from './influencer/influencer.module';
import { TwitterUserModule } from './twitter-user/twitter-user.module';
import { YoutubeChannelModule } from './youtube-channel/youtube-channel.module';
import { TiktokUserModule } from './tiktok-user/tiktok-user.module';
import { TwitchChannelModule } from './twitch-channel/twitch-channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    InfluencerModule,
    TwitterUserModule,
    YoutubeChannelModule,
    TiktokUserModule,
    TwitchChannelModule,
  ],
})
export class AppModule {}
