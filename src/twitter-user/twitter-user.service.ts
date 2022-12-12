import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTwitterUserInput } from './dto/create-twitter-user.input';
import { UpdateTwitterUserInput } from './dto/update-twitter-user.input';
import { TwitterUser } from './entities/twitter-user.entity';
import { Client } from 'twitter-api-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterUserService {
  constructor(
    @InjectRepository(TwitterUser)
    private twitterUsersRepository: Repository<TwitterUser>,
    private configService: ConfigService,
  ) {}

  create(createTwitterUserInput: CreateTwitterUserInput): Promise<TwitterUser> {
    const newTwitterUser = this.twitterUsersRepository.create(
      createTwitterUserInput,
    );

    return this.twitterUsersRepository.save(newTwitterUser);
  }

  findAll(): Promise<TwitterUser[]> {
    return this.twitterUsersRepository.find();
  }

  async findOne(twitterId: number): Promise<TwitterUser> {
    return await this.twitterUsersRepository.findOneOrFail({
      where: { id: twitterId },
    });
  }

  async update(
    id: number,
    updateTwitterUserInput: UpdateTwitterUserInput,
  ): Promise<TwitterUser> {
    const twitterUser = await this.findOne(id);

    return this.twitterUsersRepository.save({
      ...twitterUser,
      ...updateTwitterUserInput,
    });
  }

  async remove(id: number) {
    const twitterUser = await this.findOne(id);

    return this.twitterUsersRepository.remove(twitterUser);
  }

  async getFollowersCount(username: string): Promise<number> {
    const Bearer = this.configService.get<string>(
      'TWITTER_BEARER_TOKEN',
    ) as string;
    const client = new Client(Bearer);
    const { data } = await client.users.findUserByUsername(username, {
      'user.fields': ['public_metrics'],
    });

    return data.public_metrics.followers_count;
  }

  async getUser(username: string) {
    const Bearer = this.configService.get<string>(
      'TWITTER_BEARER_TOKEN',
    ) as string;
    const client = new Client(Bearer);
    const { data } = await client.users.findUserByUsername(username, {
      'user.fields': ['public_metrics'],
    });

    if (data == undefined) {
      throw new NotFoundException(`Twitter Handle ${username} not found`);
    } else {
      return data;
    }
  }

  async createTwitterUser(username: string) {
    try {
      const twitterUserData = await this.getUser(username);
      const followers_count = twitterUserData.public_metrics.followers_count;
      const input: CreateTwitterUserInput = {
        twitterHandle: username,
        followers: followers_count,
      };

      const twitterUser = await this.create(input);
      return twitterUser;
    } catch (error) {
      throw error;
    }
  }
}
