import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { YoutubeChannelService } from './youtube-channel.service';
import { YoutubeChannel } from './entities/youtube-channel.entity';
import { CreateYoutubeChannelInput } from './dto/create-youtube-channel.input';
import { UpdateYoutubeChannelInput } from './dto/update-youtube-channel.input';

@Resolver(() => YoutubeChannel)
export class YoutubeChannelResolver {
  constructor(private readonly youtubeChannelService: YoutubeChannelService) {}

  // @Mutation(() => YoutubeChannel)
  // createYoutubeChannel(@Args('createYoutubeChannelInput') createYoutubeChannelInput: CreateYoutubeChannelInput) {
  //   return this.youtubeChannelService.create(createYoutubeChannelInput);
  // }

  @Query(() => [YoutubeChannel], { name: 'youtubeChannels' })
  findAll() {
    return this.youtubeChannelService.findAll();
  }

  @Query(() => YoutubeChannel, { name: 'youtubeChannel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.youtubeChannelService.findOne(id);
  }

  // @Mutation(() => YoutubeChannel)
  // updateYoutubeChannel(@Args('updateYoutubeChannelInput') updateYoutubeChannelInput: UpdateYoutubeChannelInput) {
  //   return this.youtubeChannelService.update(updateYoutubeChannelInput.id, updateYoutubeChannelInput);
  // }

  // @Mutation(() => YoutubeChannel)
  // removeYoutubeChannel(@Args('id', { type: () => Int }) id: number) {
  //   return this.youtubeChannelService.remove(id);
  // }
  
}
