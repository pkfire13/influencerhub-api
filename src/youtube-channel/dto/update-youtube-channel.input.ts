import { CreateYoutubeChannelInput } from './create-youtube-channel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateYoutubeChannelInput extends PartialType(CreateYoutubeChannelInput) {
  @Field(() => Int)
  id: number;

  
}
