import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InfluencerService } from './influencer.service';
import { Influencer } from './entities/influencer.entity';
import { CreateInfluencerInput } from './dto/create-influencer.input';
import { UpdateInfluencerInput } from './dto/update-influencer.input';
import { TwitterUser } from 'src/twitter-user/entities/twitter-user.entity';
import { YoutubeChannel } from 'src/youtube-channel/entities/youtube-channel.entity';
import { TwitchChannel } from "src/twitch-channel/entities/twitch-channel.entity";

@Resolver(() => Influencer)
export class InfluencerResolver {
  constructor(private readonly influencerService: InfluencerService) {}

  @Mutation(() => Influencer)
  createInfluencer(
    @Args('createInfluencerInput') createInfluencerInput: CreateInfluencerInput,
  ): Promise<Influencer> {
    return this.influencerService.create(createInfluencerInput);
  }

  @Query(() => [Influencer], { name: 'influencers' })
  findAll(): Promise<Influencer[]> {
    return this.influencerService.findAll();
  }

  @Query(() => Influencer, { name: 'influencer' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Influencer> {
    return this.influencerService.findOne(id);
  }

  @Mutation(() => Influencer)
  updateInfluencer(
    @Args('updateInfluencerInput') updateInfluencerInput: UpdateInfluencerInput,
  ): Promise<Influencer> {
    return this.influencerService.update(
      updateInfluencerInput.id,
      updateInfluencerInput,
    );
  }

  @Mutation(() => Influencer)
  removeInfluencer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Influencer> {
    return this.influencerService.remove(id);
  }

  @Mutation(() => Influencer)
  updateTwitterHandle(
    @Args('updateInfluencerInput') updateInfluencerInput: UpdateInfluencerInput,
  ): Promise<Influencer> {
    return this.influencerService.updateTwitterUser(
      updateInfluencerInput.id,
      updateInfluencerInput,
    );
  }

  @Mutation(() => Influencer)
  updateYoutubeChannelUsername(
    @Args('updateInfluencerInput') updateInfluencerInput: UpdateInfluencerInput,
  ) {
    return this.influencerService.updateYoutubeChannel(
      updateInfluencerInput.id,
      updateInfluencerInput,
    );
  }

  @Mutation(() => Influencer)
  updateTwitchChannelHandle(
    @Args('updateInfluencerInput') updateInfluencerInput: UpdateInfluencerInput,
  ){
    return this.influencerService.updateTwitchChannel(updateInfluencerInput.id, updateInfluencerInput)
  }

  @ResolveField((returns) => TwitterUser)
  twitter(@Parent() influencer: Influencer): Promise<TwitterUser> {
    return this.influencerService.getTwitterUser(influencer.twitterId);
  }

  @ResolveField((returns) => YoutubeChannel)
  youtubeChannel(@Parent() influencer: Influencer): Promise<YoutubeChannel> {
    return this.influencerService.getYoutubeChannel(
      influencer.youtubeChannelId,
    );
  }

  @ResolveField((returns) => TwitchChannel)
  twitchChannel(@Parent() influencer: Influencer): Promise<TwitchChannel> {
    return this.influencerService.getTwitchChannel(influencer.twitchChannelId)
  }
}
