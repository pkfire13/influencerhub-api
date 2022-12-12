import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInfluencerInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  twitterHandle?: string;

  @Field({ nullable: true })
  youtubeChannelHandle?: string;
}
