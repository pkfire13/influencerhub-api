import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';
import { TwitterUserService } from './twitter-user.service';
import { TwitterUser } from './entities/twitter-user.entity';
import { CreateTwitterUserInput } from './dto/create-twitter-user.input';
import { UpdateTwitterUserInput } from './dto/update-twitter-user.input';

@Resolver(() => TwitterUser)
export class TwitterUserResolver {
  constructor(private readonly twitterUserService: TwitterUserService) {}

  // @Mutation(() => TwitterUser)
  // createTwitterUser(
  //   @Args('createTwitterUserInput')
  //   createTwitterUserInput: CreateTwitterUserInput,
  // ): Promise<TwitterUser> {
  //   return this.twitterUserService.create(createTwitterUserInput);
  // }

  @Query(() => [TwitterUser], { name: 'twitterUsers' })
  findAll(): Promise<TwitterUser[]> {
    return this.twitterUserService.findAll();
  }

  @Query(() => TwitterUser, { name: 'twitterUser' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<TwitterUser> {
    return this.twitterUserService.findOne(id);
  }

  // @Mutation(() => TwitterUser)
  // updateTwitterUser(
  //   @Args('updateTwitterUserInput')
  //   updateTwitterUserInput: UpdateTwitterUserInput,
  // ): Promise<TwitterUser> {
  //   return this.twitterUserService.update(
  //     updateTwitterUserInput.id,
  //     updateTwitterUserInput,
  //   );
  // }

  @Mutation(() => TwitterUser)
  removeTwitterUser(@Args('id', { type: () => Int }) id: number): Promise<TwitterUser> {
    return this.twitterUserService.remove(id);
  }
}
