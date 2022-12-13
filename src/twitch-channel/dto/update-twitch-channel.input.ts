import { CreateTwitchChannelInput } from './create-twitch-channel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTwitchChannelInput extends PartialType(CreateTwitchChannelInput) {
  @Field(() => Int)
  id: number;
}
