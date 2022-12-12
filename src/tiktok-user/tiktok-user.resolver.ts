import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TiktokUserService } from './tiktok-user.service';
import { TiktokUser } from './entities/tiktok-user.entity';
import { CreateTiktokUserInput } from './dto/create-tiktok-user.input';
import { UpdateTiktokUserInput } from './dto/update-tiktok-user.input';

@Resolver(() => TiktokUser)
export class TiktokUserResolver {
  constructor(private readonly tiktokUserService: TiktokUserService) {}

  @Mutation(() => TiktokUser)
  createTiktokUser(@Args('createTiktokUserInput') createTiktokUserInput: CreateTiktokUserInput) {
    return this.tiktokUserService.create(createTiktokUserInput);
  }

  @Query(() => [TiktokUser], { name: 'tiktokUser' })
  findAll() {
    return this.tiktokUserService.findAll();
  }

  @Query(() => TiktokUser, { name: 'tiktokUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tiktokUserService.findOne(id);
  }

  @Mutation(() => TiktokUser)
  updateTiktokUser(@Args('updateTiktokUserInput') updateTiktokUserInput: UpdateTiktokUserInput) {
    return this.tiktokUserService.update(updateTiktokUserInput.id, updateTiktokUserInput);
  }

  @Mutation(() => TiktokUser)
  removeTiktokUser(@Args('id', { type: () => Int }) id: number) {
    return this.tiktokUserService.remove(id);
  }
}
