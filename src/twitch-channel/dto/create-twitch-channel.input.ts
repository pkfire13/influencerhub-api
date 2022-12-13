import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTwitchChannelInput {
  @Field()
  broadcasterId: string

  @Field()
  displayName: string

  @Field()
  followerCount: number

  @Field()
  subscriberCount: number

}
