import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateYoutubeChannelInput {
  @Field()
  username: string

  @Field()
  subscriberCount: string 
}
