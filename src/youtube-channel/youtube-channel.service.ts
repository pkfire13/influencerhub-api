import { youtube_v3 } from '@googleapis/youtube';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateYoutubeChannelInput } from './dto/create-youtube-channel.input';
import { UpdateYoutubeChannelInput } from './dto/update-youtube-channel.input';
import { YoutubeChannel } from './entities/youtube-channel.entity';

@Injectable()
export class YoutubeChannelService {
  constructor(
    @InjectRepository(YoutubeChannel)
    private youtubeChannelsRepository: Repository<YoutubeChannel>,
    private configService: ConfigService,
  ) {}

  create(
    createYoutubeChannelInput: CreateYoutubeChannelInput,
  ): Promise<YoutubeChannel> {
    const newYoutubeChannel = this.youtubeChannelsRepository.create(
      createYoutubeChannelInput,
    );

    return this.youtubeChannelsRepository.save(newYoutubeChannel);
  }

  findAll(): Promise<YoutubeChannel[]> {
    return this.youtubeChannelsRepository.find();
  }

  findOne(id: number): Promise<YoutubeChannel> {
    return this.youtubeChannelsRepository.findOneOrFail({ where: { id: id } });
  }

  async update(
    id: number,
    updateYoutubeChannelInput: UpdateYoutubeChannelInput,
  ): Promise<YoutubeChannel> {
    const youtubeChannel = await this.findOne(id);
    return this.youtubeChannelsRepository.save({
      ...youtubeChannel,
      ...updateYoutubeChannelInput,
    });
  }

  async remove(id: number) {
    const youtubeChannel = await this.findOne(id);
    return this.youtubeChannelsRepository.remove(youtubeChannel);
  }

  async getYoutubeChannel(username: string) {
    const apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
    const youtube = new youtube_v3.Youtube({ auth: apiKey });

    const { data } = await youtube.channels.list({
      part: ['statistics', 'id', 'contentDetails', 'snippet'],
      forUsername: username,
    });
    return data.items[0];
  }

  async createYoutubeChannel(youtubeUsername: string): Promise<YoutubeChannel> {
    try {
      const ytChannelData = await this.getYoutubeChannel(youtubeUsername);
      console.log('yt', ytChannelData);
      const input: CreateYoutubeChannelInput = {
        username: youtubeUsername,
        subscriberCount: ytChannelData.statistics.subscriberCount,
      };

      const youtubeChannel = await this.create(input);
      return youtubeChannel
    } catch (error) {
      throw error;
    }
  }
}
