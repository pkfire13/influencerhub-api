import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTwitchChannelInput } from './dto/create-twitch-channel.input';
import { UpdateTwitchChannelInput } from './dto/update-twitch-channel.input';
import { TwitchChannel } from './entities/twitch-channel.entity';
import TwitchJs from 'twitch-js';
import axios from 'axios';

@Injectable()
export class TwitchChannelService {
  constructor(
    @InjectRepository(TwitchChannel)
    private twitchChannelRepository: Repository<TwitchChannel>,
    private configService: ConfigService,
  ) {
  }
  create(
    createTwitchChannelInput: CreateTwitchChannelInput,
  ): Promise<TwitchChannel> {
    const newTwitchChannel = this.twitchChannelRepository.create(
      createTwitchChannelInput,
    );

    return this.twitchChannelRepository.save(newTwitchChannel);
  }

  findAll(): Promise<TwitchChannel[]> {
    return this.twitchChannelRepository.find();
  }

  async findOne(id: number): Promise<TwitchChannel> {
    return await this.twitchChannelRepository.findOneOrFail({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateTwitchChannelInput: UpdateTwitchChannelInput,
  ): Promise<TwitchChannel> {
    const twitchChannel = await this.findOne(id);
    return this.twitchChannelRepository.save({
      ...twitchChannel,
      ...updateTwitchChannelInput,
    });
  }

  async remove(id: number) {
    const twitchChannel = await this.findOne(id);

    return this.twitchChannelRepository.remove(twitchChannel);
  }

  async getAccessToken() {
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const clientSecret = this.configService.get<string>('TWITCH_CLIENT_SECRET');

    const url = 'https://id.twitch.tv/oauth2/token';

    // Set the headers for the request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Set the body of the request
    const body = JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });

    const { data } = await axios.post(url, body, config);
    return data.access_token;
  }

  async getBroadcastorData(broadcasterName: string) {
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const accessToken = await this.getAccessToken();

    const { api } = new TwitchJs({ token: accessToken, clientId: clientId });

    const { data } = await api.get('users', {
      search: { login: broadcasterName },
    });
    return data[0];
  }

  async getChannelInfo(broadcasterId: string) {
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const accessToken = await this.getAccessToken();

    const { api } = new TwitchJs({ token: accessToken, clientId: clientId });

    const params = { broadcaster_id: broadcasterId };
    const { data } = await api.get('channels', { search: params });
    return data[0]
  }

  async getFollowers(broadcasterId: string){
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const accessToken = await this.getAccessToken();

    const { api } = new TwitchJs({ token: accessToken, clientId: clientId });

    const params = { to_id: broadcasterId };
    const { total,data } = await api.get('users/follows', { search: params });
    return total
  }

  /**
   * ! Need user access token 
   * @param broadcasterId 
   * @returns 
   */
  async getSubscriberCount(broadcasterId: string){
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const accessToken = await this.getAccessToken();

    const { api } = new TwitchJs({ token: accessToken, clientId: clientId });

    const params = { broadcaster_id: broadcasterId };
    const { data , total, points} = await api.get('subscriptions', { search: params });
    return total 
  }

  async createTwitchChannel(username: string) {
    try {
      const broadcasterData = await this.getBroadcastorData(username);
      const id = broadcasterData.id;
      const displayName = broadcasterData.displayName

      const followerCount = await this.getFollowers(id)
      // const subscriberCount = await this.getSubscriberCount(id)

      const input: CreateTwitchChannelInput = {
        broadcasterId: id,
        displayName: displayName,
        followerCount: followerCount,
        subscriberCount: 0
      }

      const twitchChannel = await this.create(input)
      return twitchChannel
    } catch (error) {
      throw error;
    }
  }
}
