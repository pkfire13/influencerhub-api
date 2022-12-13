import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TwitchChannelService } from './twitch-channel.service';
import { TwitchChannel } from './entities/twitch-channel.entity';
import { CreateTwitchChannelInput } from './dto/create-twitch-channel.input';
import { UpdateTwitchChannelInput } from './dto/update-twitch-channel.input';

@Resolver(() => TwitchChannel)
export class TwitchChannelResolver {
  constructor(private readonly twitchChannelService: TwitchChannelService) {}

  // @Mutation(() => TwitchChannel)
  // createTwitchChannel(@Args('createTwitchChannelInput') createTwitchChannelInput: CreateTwitchChannelInput) {
  //   return this.twitchChannelService.create(createTwitchChannelInput);
  // }

  @Query(() => [TwitchChannel], { name: 'twitchChannels' })
  findAll() {
    return this.twitchChannelService.findAll();
  }

  @Query(() => TwitchChannel, { name: 'twitchChannel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.twitchChannelService.findOne(id);
  }

  // @Mutation(() => TwitchChannel)
  // updateTwitchChannel(@Args('updateTwitchChannelInput') updateTwitchChannelInput: UpdateTwitchChannelInput) {
  //   return this.twitchChannelService.update(updateTwitchChannelInput.id, updateTwitchChannelInput);
  // }

  // @Mutation(() => TwitchChannel)
  // removeTwitchChannel(@Args('id', { type: () => Int }) id: number) {
  //   return this.twitchChannelService.remove(id);
  // }
}
