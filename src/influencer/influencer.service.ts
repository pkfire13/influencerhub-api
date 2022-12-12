import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TwitterUser } from 'src/twitter-user/entities/twitter-user.entity';
import { TwitterUserService } from 'src/twitter-user/twitter-user.service';
import { YoutubeChannel } from 'src/youtube-channel/entities/youtube-channel.entity';
import { YoutubeChannelService } from 'src/youtube-channel/youtube-channel.service';
import { Repository } from 'typeorm';
import { CreateInfluencerInput } from './dto/create-influencer.input';
import { UpdateInfluencerInput } from './dto/update-influencer.input';
import { Influencer } from './entities/influencer.entity';

@Injectable()
export class InfluencerService {
  constructor(
    @InjectRepository(Influencer)
    private influencersRepository: Repository<Influencer>,
    private twitterUsersService: TwitterUserService,
    private youtubeChannelService: YoutubeChannelService,
  ) {}

  async create(
    createInfluencerInput: CreateInfluencerInput,
  ): Promise<Influencer> {
    const newInfluencer = this.influencersRepository.create(
      createInfluencerInput,
    );

    // if twitterHandle != Null, run updateTwitter
    if (newInfluencer.twitterHandle != null) {
      const twitterUser = await this.createTwitterUser(
        newInfluencer.twitterHandle,
      );
      newInfluencer.twitterId = twitterUser.id;
    }

    if (newInfluencer.youtubeChannelHandle != null) {
      const youtubeChannel = await this.createYoutubeChannel(
        newInfluencer.youtubeChannelHandle,
      );
      newInfluencer.youtubeChannelId = youtubeChannel.id;
    }

    return this.influencersRepository.save(newInfluencer);
  }

  findAll(): Promise<Influencer[]> {
    return this.influencersRepository.find();
  }

  findOne(id: number): Promise<Influencer> {
    return this.influencersRepository.findOneOrFail({ where: { id: id } });
  }

  async update(
    id: number,
    updateInfluencerInput: UpdateInfluencerInput,
  ): Promise<Influencer> {
    const influencer = await this.findOne(id);

    return this.influencersRepository.save({
      ...influencer,
      ...updateInfluencerInput,
    });
  }

  async remove(id: number): Promise<Influencer> {
    const influencer = await this.findOne(id);

    return this.influencersRepository.remove(influencer);
  }

  async updateTwitterUser(
    influencerId: number,
    updateInfluencerInput: UpdateInfluencerInput,
  ): Promise<Influencer> {
    try {
      const twitterUser = await this.twitterUsersService.createTwitterUser(
        updateInfluencerInput.twitterHandle,
      );
      const input = {
        id: influencerId,
        twitterId: twitterUser.id,
      };
      const updatedInfluencer = await this.update(influencerId, input);
      return updatedInfluencer;
    } catch (error) {
      throw error;
    }
  }

  async createTwitterUser(twitterHandle: string) {
    try {
      const twitterUser = await this.twitterUsersService.createTwitterUser(
        twitterHandle,
      );
      return twitterUser;
    } catch (error) {
      throw error;
    }
  }

  async getTwitterUser(twitterId: number): Promise<TwitterUser> {
    if (twitterId == null) {
      const user: TwitterUser = {
        id: 0,
        twitterHandle: '',
        followers: 0,
        influencer: null,
      };
      return user;
    }
    return this.twitterUsersService.findOne(twitterId);
  }

  async createYoutubeChannel(youtubeUsername: string) {
    try {
      const youtubeChannel =
        await this.youtubeChannelService.createYoutubeChannel(youtubeUsername);
      return youtubeChannel;
    } catch (error) {
      throw error;
    }
  }

  async updateYoutubeChannel(
    influencerId: number,
    updateInfluencerInput: UpdateInfluencerInput,
  ) {
    try {
      const youtubeChannel =
        await this.youtubeChannelService.createYoutubeChannel(
          updateInfluencerInput.twitterHandle,
        );
      const input = {
        id: influencerId,
        youtubeChannelId: youtubeChannel.id,
      };
      const updatedInfluencer = await this.update(influencerId, input);
      return updatedInfluencer;
    } catch (error) {
      throw error;
    }
  }

  async getYoutubeChannel(youtubeChannelId: number): Promise<YoutubeChannel> {
    if (youtubeChannelId == null) {
      const user: YoutubeChannel = {
        id: 0,
        username: '',
        subscriberCount: '',
        influencer: null,
      };
      return user;
    }
    return this.youtubeChannelService.findOne(youtubeChannelId);
  }

}
